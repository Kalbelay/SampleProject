import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, Column, Pager, Paging } from "devextreme-react/data-grid";
import { fetchAllAttachments } from "../../api/slice/attachmentSlice";


export const Att = ({ type, selectedRowKeys, onRowClick, selectedPerson }) => {
    const dispatch = useDispatch();
    const AllAttachments = useSelector((state) => state.Attachments?.allAttachment);

    useEffect(() => {
        // if (type)
          dispatch(fetchAllAttachments());
      }, [dispatch, type, selectedPerson]);

    return (
    <div className="lg:w-1/2 p-2 space-x-4">
      <div className="w-full bg-white border p-2">
        <DataGrid
            dataSource={AllAttachments?.filter(
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
            <Column dataField="fileName" caption="File Name" />
            <Column dataField="attachmentType" caption="Attachment Type" />
            <Column dataField="size" caption="Size (in bytes)" />
            <Column dataField="attachmentTime" caption="Attachment Time" />

            {/* <Column dataField="formFile" caption="formFile" /> */}
            
            <Pager enabled={true} showPageSizeSelector={true} showInfo={true} />
            <Paging defaultPageSize={15} />
            </DataGrid>
      </div>
    </div>
    );
}
