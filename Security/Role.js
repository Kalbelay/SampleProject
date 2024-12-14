import { fetchAllRoles } from '../../api/slice/RoleSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';

const Role = ({ type, selectedRowKeys, onRowClick, issaved }) => {
    const all_Role = useSelector((state) => state.Roles?.allRole); // Redux state
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Fetching roles...");
        dispatch(fetchAllRoles());
    }, [dispatch, type, issaved]);

    console.log("all_Role in component:", all_Role); // Debug Redux state

    return (
        <div className="p-2">
            <DataGrid
                dataSource={Array.isArray(all_Role) ? all_Role : []} // Ensure array binding
                keyExpr="code" // Ensure this matches the unique field in your data
                onRowClick={onRowClick}
                showBorders={true}
                onRowDblClick={(e) => selectedRowKeys(e)}
                focusedRowEnabled={true}
                columnAutoWidth={true}
                columnHidingEnabled={true}
                onContentReady={(e) => console.log("DataGrid DataSource:", e.component.option("dataSource"))}
            >
                <Column dataField="description" caption="Description" />
            </DataGrid>
        </div>
    );
};

export default Role;
