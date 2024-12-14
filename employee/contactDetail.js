import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, Column, Pager, Paging } from "devextreme-react/data-grid";
import { fetchAllContactDetails } from "../../api/slice/contactDetailSlice";

const ContactDetail = ({ type, selectedRowKeys,selectedPerson, onRowClick }) => {
  const dispatch = useDispatch();
  const AllContact = useSelector(
    (state) => state.ContactDetails?.allContactDetail
  );

  useEffect(() => {
    dispatch(fetchAllContactDetails());
  }, [dispatch, type, selectedPerson]);
  return (
    <div className="w-full bg-white border p-2">
      <DataGrid
        dataSource={AllContact?.filter((c) => c?.empCode == selectedPerson)}
        keyExpr="id"
        showBorders={true}
        onRowClick={onRowClick}
        focusedRowEnabled={true}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        onRowDblClick={(e) => selectedRowKeys(e)}
      >
        <Column dataField="sequence" caption="Sequence" />
        <Column dataField="postalCode" caption="Postal Code" />
        <Column dataField="regionalHierarchyCode" caption="Location" />
        <Column dataField="mobileNumber" caption="Mobile Number" />
        <Column dataField="homeTelephone" caption="Home Telephone" />
        <Column dataField="workTelephone" caption="Work Telephone" />
        <Column dataField="workEmail" caption="Work Email" />
        <Column dataField="otherEmail" caption="Other Email" />
        <Column dataField="otherAddress" caption="Other Address" />
        <Pager enabled={true} showPageSizeSelector={true} showInfo={true} />
        <Paging defaultPageSize={15} />
      </DataGrid>
    </div>
  );
};

export default ContactDetail;
