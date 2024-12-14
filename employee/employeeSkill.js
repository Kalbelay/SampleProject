import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, Column, Pager, Paging } from "devextreme-react/data-grid";
import { fetchAllEmployeeSkills } from "../../api/slice/employeeSkillSlice";

const EmployeeSkill = ({
  type,
  selectedRowKeys,
  selectedPerson,
  onRowClick
}) => {
  const dispatch = useDispatch();
  const AllEmployeeSkill = useSelector(
    (state) => state.EmployeeSkills?.allEmployeeSkill
  );

  useEffect(() => {
    dispatch(fetchAllEmployeeSkills());
  }, [dispatch, type, selectedPerson]);
  return (
    <div className="w-full bg-white border p-2">
      <DataGrid
        dataSource={AllEmployeeSkill?.filter(
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
        <Column dataField="skillCode" caption="Skill" />
        <Column dataField="yearsOfExperience" caption="Experience" />
        <Column dataField="remark" caption="Comment" />
        <Pager enabled={true} showPageSizeSelector={true} showInfo={true} />
        <Paging defaultPageSize={15} />
      </DataGrid>
    </div>
  );
};

export default EmployeeSkill;
