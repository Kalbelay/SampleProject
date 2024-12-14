import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, Column, Pager, Paging } from "devextreme-react/data-grid";
import { fetchAllEmergencyContacts } from "../../api/slice/emergencyContactSlice";

const EmergencyContact = ({ type, selectedRowKeys, selectedPerson, onRowClick }) => {
  const dispatch = useDispatch();
  const AllEmergencyContact = useSelector(
    (state) => state.EmergencyContacts?.allEmergencyContact
  );

  useEffect(() => {
    dispatch(fetchAllEmergencyContacts());
  }, [dispatch, type, selectedPerson]);
  return (
    <div className="w-full bg-white border p-2">
      <DataGrid
        dataSource={AllEmergencyContact?.filter(
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
        <Column dataField="homePhone" caption="Home phone" />
        <Column dataField="mobilePhone" caption="Mobile phone" />
        <Column dataField="officePhone" caption="Office phone" />
        <Column dataField="otherAddress" caption="Other address" />
        <Column dataField="regionalHierarchyCode" caption="Location" />
        <Pager enabled={true} showPageSizeSelector={true} showInfo={true} />
        <Paging defaultPageSize={15} />
      </DataGrid>
    </div>
  );
};

export default EmergencyContact;
