import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, Column, Pager, Paging } from "devextreme-react/data-grid";
import { fetchAllImmigrations } from "../../api/slice/ImmigrationSlice";


export const Immigration = ({ type, selectedRowKeys, onRowClick, selectedPerson }) => {
    const dispatch = useDispatch();
    const AllImmigrations = useSelector((state) => state.Immigrations?.allImmigration);

    useEffect(() => {
        // if (type)
          dispatch(fetchAllImmigrations());
      }, [dispatch, type, selectedPerson]);

    return (
    <div className="lg:flex p-2 space-x-4">
      <div className="w-full bg-white border p-2">
      <DataGrid
          dataSource={AllImmigrations?.filter(
            (c) => c?.empCode == selectedPerson
          )}
          keyExpr="id"
          onRowClick={onRowClick}
          showBorders={true}
          focusedRowEnabled={true}
          columnAutoWidth={true}
          columnHidingEnabled={true}
          onRowDblClick={selectedRowKeys}
        >
          <Column dataField="type" caption="Type" />
          <Column dataField="number" caption="Number" />
          <Column dataField="issuedDate" caption="Issued Date" dataType="date"/>
          <Column dataField="expireDate" caption="Expire Date" dataType="date"/>
          <Column dataField="comment" caption="Comment" />
          <Column dataField="currentStatus" caption="Current Status" />
          {/* <Column dataField="formFile" caption="formFile" /> */}
          
          <Pager enabled={true} showPageSizeSelector={true} showInfo={true} />
          <Paging defaultPageSize={15} />
        </DataGrid>
      </div>
    </div>
    );
}
