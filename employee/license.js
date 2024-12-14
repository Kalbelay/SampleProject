import React, { useEffect, useRef, useState } from 'react'
import {DataGrid,Column,Pager, Paging,} from 'devextreme-react/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchAllEmployeeLicenses,  } from '../../api/slice/EmployeeLicenseSlice';
import { fetchAllLookups } from '../../api/slice/lookupSlice';

const EmployeeLicense = ({
  type,
  selectedRowKeys,
  selectedPerson,
  onRowClick
}) => {
  const dispatch = useDispatch();
  const all_EmployeeLicense = useSelector(
    (state) => state.EmployeeLicenses?.allEmployeeLicense
  );
  useEffect(() => {
    dispatch(fetchAllEmployeeLicenses());
    dispatch(fetchAllLookups());
  }, [dispatch, type, selectedPerson]);

  return (
    <React.Fragment>
      <div className="lg:flex gap-2 p-2">
        <div className="w-full border bg-white  p-2 rounded-lg shadow-lg">
          <DataGrid
            dataSource={all_EmployeeLicense?.filter(
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
            <Column dataField="licenseCode" caption="License " />
            <Column dataField="licenseNumber" caption=" License Number" />
            <Column dataField="issueDate" caption=" Issue Date" />
            <Column dataField="expiryDate" caption="Expiry Date" />
            <Pager enabled={true} showPageSizeSelector={true} showInfo={true} />
            <Paging defaultPageSize={15} />
          </DataGrid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EmployeeLicense
