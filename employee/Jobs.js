import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, Column, Pager, Paging } from "devextreme-react/data-grid";
import { fetchAllJobs } from "../../api/slice/JobSlice";


export const Jobs = ({ type, selectedRowKeys, onRowClick, selectedPerson }) => {
    const dispatch = useDispatch();
    const AllJobs = useSelector((state) => state.Jobs?.allJob);

    useEffect(() => {
        // if (type)
          dispatch(fetchAllJobs());
      }, [dispatch, type, selectedPerson]);

    return (
        <div className="lg:flex p-2 space-x-4">
        <div className="w-full bg-white border p-2">
        <DataGrid
            dataSource={AllJobs?.filter(
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
            <Column dataField="jobTitleCode" caption="Job Title" />
            <Column dataField="employmentStatus" caption="Employment Status" />
            <Column dataField="jobCategory" caption="Job Category" />
            <Column dataField="joinedDate" caption="Joined Date" dataType="date"/>
            <Column dataField="unit" caption="Unit" />
            <Column dataField="startingDate" caption="Starting Date" dataType="date"/>
            <Column dataField="endingDate" caption="Ending Date" dataType="date"/>
            <Column dataField="status" caption="Status" />
            <Column dataField="jobSpecification" caption="Job Specfication" />
            <Column dataField="contractDetail" caption="Contract Detail" />
            {/* <Column dataField="formFile" caption="formFile" /> */}
            
            <Pager enabled={true} showPageSizeSelector={true} showInfo={true} />
            <Paging defaultPageSize={15} />
          </DataGrid>
        </div>
      </div>
    );
}
