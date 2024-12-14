import React, { useEffect, useRef, useState } from 'react'
import { DataGrid, Column, Pager, Paging } from 'devextreme-react/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import {  fetchAllWorkExperiences, } from '../../api/slice/WorkExperienceSlice';
import { fetchAllLookups } from '../../api/slice/lookupSlice';

const WorkExperience = ({
  type,
  selectedRowKeys,
  selectedPerson,
  onRowClick
}) => {
  const dispatch = useDispatch();
  const all_lookup = useSelector((state) => state.lookups.allLookup);
  const all_WorkExperience = useSelector(
    (state) => state.WorkExperiences?.allWorkExperience
  );

  useEffect(() => {
    dispatch(fetchAllWorkExperiences());
    dispatch(fetchAllLookups());
  }, [dispatch, type, selectedPerson]);
  return (
    <React.Fragment>
      <div className="lg:flex gap-2 p-2">
        <div className="w-full border bg-white  p-2 rounded-lg shadow-lg">
          <DataGrid
            dataSource={all_WorkExperience?.filter(
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
            <Column dataField="jobTitle" caption="Job Title" />
            <Column dataField="startingDate" caption=" Starting Date" />
            <Column dataField="endingDate" caption=" Ending Date" />
            <Column dataField="remark" caption="Remark" />
            <Pager enabled={true} showPageSizeSelector={true} showInfo={true} />
            <Paging defaultPageSize={15} />
          </DataGrid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WorkExperience
