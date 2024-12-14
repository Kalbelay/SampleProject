import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {DataGrid,Column,Pager, Paging} from 'devextreme-react/data-grid';
import { fetchAllEducations } from '../../api/slice/EducationSlice';
import { fetchAllLookups } from '../../api/slice/lookupSlice';
import { documentService } from '../../api/service/documentService';
import { PageSize,PageNumber } from 'devextreme-react/cjs/diagram';


const Education = ({ type, selectedRowKeys, selectedPerson, onRowClick }) => {
  const dispatch = useDispatch();
  const all_Education = useSelector((state) => state.Educations?.allEducation);

  useEffect(() => {
    dispatch(fetchAllEducations());
    dispatch(fetchAllLookups());
  }, [dispatch, type, selectedPerson]);


  return (
    <React.Fragment>
      <div className="lg:flex gap-2 p-2">
        <div className="w-full border bg-white  p-2 rounded-lg shadow-lg">
          <DataGrid
            dataSource={all_Education?.filter(
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
            <Column dataField="sequenceNumber" caption=" Sequence" />
            <Column dataField="educationalLevelCode" caption="Level" />
            <Column dataField="educationCode" caption="Subject" />
            <Column dataField="year" caption="Year of Graduation" />
            <Column dataField="score" caption="Score" />
            <Column dataField="instituteCode" caption=" Institute" />
            <Column
              dataField="startingDate"
              caption=" Starting Date"
              dataType="date"
            />
            <Column
              dataField="endingDate"
              caption=" Ending Date"
              dataType="date"
            />
            <Pager enabled={true} showPageSizeSelector={true} showInfo={true} />
            <Paging defaultPageSize={15} />
          </DataGrid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Education