import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, Column, Pager, Paging } from "devextreme-react/data-grid";
import { fetchAllOrganizations } from "../../api/slice/OrganizationSlice";
import { fetchLookupByType } from "../../api/slice/lookupSlice";
import { Organization_Type } from "../../api/systemConstant";

export const OrgUnit = ({ type, selectedRowKeys, onRowClick, onOrgRowClick, selectedPerson, orgType }) => {
    const dispatch = useDispatch();
    const AllOrganizationUnits = useSelector(
      (state) => state.Organizations?.allOrganization
    );

    useEffect(() => {
        // if (type)
        // dispatch(fetchLookupByType("organizationType"));
        dispatch(fetchAllOrganizations());
      }, [dispatch, type, selectedPerson]);

    return (
      <div className="lg:flex p-2 space-x-4">
        <div className="lg:w-1/4 w-full bg-white border p-2">
        <DataGrid
          dataSource={Organization_Type}
          keyExpr="id"
          showBorders={true}
          onRowClick={onOrgRowClick}
          focusedRowEnabled={true}
        >
        <Column
          caption="Type"
          allowSorting={false}
          cellRender={(data) => (
            <div className="flex items-center">
              <i
                className={`dx-icon-${data.data.icon} text-xl mr-2`}
                style={{ fontSize: "1.5rem" }}
              />
              <span className="font-semibold">{data.data.name}</span>
            </div>
          )}
        />
      </DataGrid>
    </div>
    <div className="lg:w-full w-full bg-white border p-2">
      <DataGrid
          dataSource={AllOrganizationUnits?.filter(
            (c) => c?.referenceCode == selectedPerson && c?.type == orgType
          )}
          keyExpr="id"
          onRowClick={onRowClick}
          showBorders={true}
          focusedRowEnabled={true}
          columnAutoWidth={true}
          columnHidingEnabled={true}
          onRowDblClick={selectedRowKeys}
        >
          <Column dataField="name" caption="name" />
          <Column dataField="remark" caption="remark" />
          
          <Pager enabled={true} showPageSizeSelector={true} showInfo={true} />
          <Paging defaultPageSize={15} />
        </DataGrid>

      </div>
    </div>
    );
}
