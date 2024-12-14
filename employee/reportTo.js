import React, { useEffect, useRef, useState } from 'react'
import {DataGrid,Column,Pager, Paging, } from 'devextreme-react/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllReportTos,  } from '../../api/slice/ReportToSlice';
import { fetchAllLookups } from '../../api/slice/lookupSlice';

const ReportTo = ({ type, selectedRowKeys, selectedPerson, onRowClick }) => {
  const dispatch = useDispatch();
  const all_lookup = useSelector((state) => state.lookups.allLookup);
  const all_ReportTo = useSelector((state) => state.ReportTos?.allReportTo);
  useEffect(() => {
    dispatch(fetchAllReportTos());
    dispatch(fetchAllLookups());
  }, [dispatch, type, selectedPerson]);

  const [typeData4] = useState([
    { id: 1, name: " Manager" },
    { id: 2, name: " Subordinate" },
  ]);
  // const selectrowreport=(e)=>{
  //   setreportto(e.key)
  // }

  return (
    <React.Fragment>
      <div className="lg:flex gap-2 p-2">
        <div className="lg:w-60  w-full border bg-white  p-2 rounded-lg shadow-lg">
          <DataGrid
            dataSource={typeData4}
            keyExpr="id"
            showBorders={true}
            focusedRowEnabled={true}
          >
            <Column dataField="name" caption="Type" />
          </DataGrid>
        </div>
        <div className="w-full border bg-white  p-2 rounded-lg shadow-lg">
          <DataGrid
            dataSource={all_ReportTo?.filter(
              (c) => c?.subEmployeeCode == selectedPerson
            )}
            keyExpr="id"
            onRowClick={onRowClick}
            showBorders={true}
            focusedRowEnabled={true}
            columnAutoWidth={true}
            columnHidingEnabled={true}
            onRowDblClick={(e) => selectedRowKeys(e)}
          >
            <Column dataField="reportingMode" caption="Reporting Method" />
            <Column dataField="superEmployeeCode" caption=" Supervisors" />
            <Column dataField="remark" caption="Remark" />
            <Pager enabled={true} showPageSizeSelector={true} showInfo={true} />
            <Paging defaultPageSize={15} />
          </DataGrid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReportTo

