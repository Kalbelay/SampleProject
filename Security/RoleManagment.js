import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid, Column } from 'devextreme-react/data-grid';
import { fetchAllRoleManagments } from '../../api/slice/RoleManagmentSlice';
import { fetchAllLedgerDefinitions } from '../../api/slice/ledgerDefinitionSlice';
import { fetchAllRoles } from '../../api/slice/RoleSlice';
import TabPanel, { Item } from "devextreme-react/tab-panel";
const RoleManagment = ({ type, selectedRowKeys, onRowClick, issaved, onFocusedRowChanging }) => {
  const all_UserRole = useSelector((state) => state.UserRoleMappers.allUserRoleMapper);
  const all_Role = useSelector((state) => state.Roles?.allRole);
  const [filterRoleCode, setFilterRoleCode] = useState(null);
  const [RoleCode, setRoleCode] = useState("");
  const [selectedRole, setselectedRole] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRoleManagments());
    dispatch(fetchAllRoles());
  }, [dispatch, type, issaved]);

//   useEffect(() => {
//     console.log('All Ledger Definitions:', all_LedgerDefinition);
//     console.log('All Definition Details:', all_RoleManagment);
//   }, [all_LedgerDefinition, all_RoleManagment]);

  const handleUserRoleRowClick = (e) => {
    const selectedRoleCode = e.data.code; 
    setFilterRoleCode(selectedRoleCode); 
    if (onRowClick) onRowClick(e); 
  };
  const filteredUserRole = filterRoleCode
    ? all_UserRole?.filter((c) => c?.roleCode === filterRoleCode)
    : all_UserRole;
const handleRoleSelection = (selectedRole) => {
    setRoleCode(selectedRole.code); // Update the RoleCode state
    setselectedRole(selectedRole.description); // Update the selected role description
    console.log("Selected Role:", selectedRole);
};

  return (
    <div className="md:flex bg-white rounded">
      <div className="md:w-1/4 p-1">
        <DataGrid
          dataSource={Array.isArray(all_Role) ? all_Role : []}
          keyExpr="code"
          showBorders={true}
          onRowClick={handleUserRoleRowClick} 
          focusedRowEnabled={true}
         >
          <Column dataField="description" caption="Role" />
        </DataGrid>
      </div>
      <div className="lg:w-3/4 bg-white border p-2">
                    <TabPanel>
                      <Item title="User Membership">
                      <DataGrid
                    dataSource={filteredUserRole} 
                    keyExpr="code"
                    showBorders={true}
                    onRowDblClick={(e) => {
                      selectedRowKeys(e);
                    }}
                    focusedRowEnabled={true}
                    onRowClick={onFocusedRowChanging}
                    onFocusedRowChanged={(e) => handleRoleSelection(e.row.data)}
              >
                <Column dataField="userCode" caption="User Name" />
                <Column dataField="employeeCode" caption="Employee Name" />
                <Column dataField="expiryDate" caption="Expiry Date" />
              </DataGrid>
                      </Item>
                      <Item title="UI Access">
                      <div className="md:flex bg-white rounded">
                      <div className="md:w-1/4 p-1">
                           <DataGrid>
                            <Column dataField="description" caption="functionality Header" />
                           </DataGrid>
                      </div>
                <div className="lg:w-3/4 bg-white border p-2">
                     <DataGrid >
                      <Column dataField="description" caption="functionality" />
                      <Column dataField="connectThrough" caption="Can Access" />
                      <Column dataField="unit" caption="Type" />
                     </DataGrid>
                  </div>
                  </div>
                      </Item>
                      <Item title="Role Operation">
                      <div className="md:flex bg-white rounded">
                      <div className="md:w-1/4 p-1">
                           <DataGrid>
                            <Column dataField="description" caption="Document" />
                           </DataGrid>
                      </div>
                <div className="lg:w-3/4 bg-white border p-2">
                     <DataGrid >
                      <Column dataField="description" caption="operation" />
                      <Column dataField="connectThrough" caption="Pass Key Required" />
                      <Column dataField="unit" caption="Range" />
                     </DataGrid>
                  </div>
                  </div>
                      </Item>
                      <Item title="Report Access"></Item>
                      <Item title="Document Opration"></Item>
                      <Item title="Object Access"></Item>
                    </TabPanel>
                  </div>
    </div>
  );
};

export default RoleManagment;