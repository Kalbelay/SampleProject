import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, Column, Pager, Paging } from "devextreme-react/data-grid";
import { fetchAllEmployeeLanguageProficiencys } from "../../api/slice/employeeLanguageProficiencySlice";

const EmployeeLanguageProficiency = ({
  type,
  selectedPerson, selectedRowKeys,
  onRowClick,
}) => {
  const dispatch = useDispatch();
  const AllLanguageProficiency = useSelector(
    (state) => state.EmployeeLanguageProficiencys?.allEmployeeLanguageProficiency
  );

  useEffect(() => {
    dispatch(fetchAllEmployeeLanguageProficiencys());
  }, [dispatch, type, selectedPerson]);
  return (
    <div className="w-full bg-white border p-2">
      <DataGrid
        dataSource={AllLanguageProficiency?.filter(
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
        <Column dataField="languageCode" caption="Language" />
        <Column dataField="readingLevel" caption="Reading Level" />
        <Column dataField="writingLevel" caption="Writing Level" />
        <Column dataField="speakingLevel" caption="Speaking Level" />
        <Pager enabled={true} showPageSizeSelector={true} showInfo={true} />
        <Paging defaultPageSize={15} />
      </DataGrid>
    </div>
  );
};

export default EmployeeLanguageProficiency;
