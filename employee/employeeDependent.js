import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, Column, Pager, Paging } from "devextreme-react/data-grid";
import { fetchAllEmployeeDependents } from "../../api/slice/employeeDependentSlice";

const EmployeeDependent = ({ type, selectedRowKeys, selectedPerson, onRowClick }) => {
  const dispatch = useDispatch();
  const AllEmployeeDependent = useSelector(
    (state) => state.EmployeeDependents?.allEmployeeDependent
  );
  useEffect(() => {
    dispatch(fetchAllEmployeeDependents());
  }, [dispatch, type, selectedPerson]);
  return (
    <div className="w-full bg-white border p-2">
      <DataGrid
        dataSource={AllEmployeeDependent?.filter(
          (c) => c?.empCode == selectedPerson
        )}
        keyExpr="id"
        showBorders={true}
        onRowClick={onRowClick}
        focusedRowEnabled={true}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        onRowDblClick={(e) => selectedRowKeys(e)}
      >
        <Column dataField="name" caption="Name" />
        <Column dataField="relationship" caption="Relationship" />
        <Column
          dataField="dateOfBirth"
          caption="Date Of Birth"
          dataType="date"
        />
        <Pager enabled={true} showPageSizeSelector={true} showInfo={true} />
        <Paging defaultPageSize={15} />
      </DataGrid>
    </div>
  );
};

export default EmployeeDependent;
