import React, { useEffect, useRef, useState } from 'react'
import {DataGrid,Column,Pager, Paging} from 'devextreme-react/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchAllMemberships,  } from '../../api/slice/MembershipSlice';
import { fetchAllLookups } from '../../api/slice/lookupSlice';

const EmployeeMembership = ({
  type,
  selectedRowKeys,
  selectedPerson,
  onRowClick
}) => {
  const dispatch = useDispatch();
  const all_Membership = useSelector(
    (state) => state.Memberships?.allMembership
  );

  useEffect(() => {
    dispatch(fetchAllMemberships());
    dispatch(fetchAllLookups());
  }, [dispatch, type, selectedPerson]);

  return (
    <React.Fragment>
      <div className="lg:flex gap-2 p-2">
        <div className="w-full border bg-white  p-2 rounded-lg shadow-lg">
          <DataGrid
            dataSource={all_Membership?.filter(
              (c) => c?.empCode == selectedPerson
            )}
            keyExpr="id"
            onRowClick={onRowClick}
            showBorders={true}
            focusedRowEnabled={true}
            columnAutoWidth={true}
            columnHidingEnabled={true}
            onRowDblClick={(e) => selectedRowKeys(e)}
          >
            <Column dataField="membershipCode" caption=" Membership" />
            <Column dataField="subscriptAmount" caption="Subscript Amount" />
            <Column dataField="startingDate" caption=" Starting Date" />
            <Column dataField="endingDate" caption=" Ending Date" />
            <Pager enabled={true} showPageSizeSelector={true} showInfo={true} />
            <Paging defaultPageSize={15} />
          </DataGrid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EmployeeMembership
