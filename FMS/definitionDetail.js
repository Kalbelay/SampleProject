import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid, Column } from 'devextreme-react/data-grid';
import { fetchAllDefinitionDetails } from '../../api/slice/DefinitionDetailSlice';
import { fetchAllLedgerDefinitions } from '../../api/slice/ledgerDefinitionSlice';

const DefinitionDetail = ({ type, selectedRowKeys, onRowClick, issaved, onFocusedRowdefinition }) => {
  const all_DefinitionDetail = useSelector((state) => state.DefinitionDetails.allDefinitionDetail);
  const all_LedgerDefinition = useSelector((state) => state.LedgerDefinitions.allLedgerDefinition);

  const [filterLedgerCode, setFilterLedgerCode] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDefinitionDetails());
    dispatch(fetchAllLedgerDefinitions());
  }, [dispatch, type, issaved]);

  useEffect(() => {
    console.log('All Ledger Definitions:', all_LedgerDefinition);
    console.log('All Definition Details:', all_DefinitionDetail);
  }, [all_LedgerDefinition, all_DefinitionDetail]);

  const handleLedgerRowClick = (e) => {
    const selectedLedgerCode = e.data.code; 
    setFilterLedgerCode(selectedLedgerCode); 
    if (onRowClick) onRowClick(e); 
  };
  const filteredDefinitionDetail = filterLedgerCode
    ? all_DefinitionDetail?.filter((c) => c?.ledgerCode === filterLedgerCode)
    : all_DefinitionDetail;

  return (
    <div className="md:flex bg-white rounded">
      <div className="md:w-1/4 p-1">
        <DataGrid
          dataSource={all_LedgerDefinition}
          keyExpr="code"
          showBorders={true}
          onRowClick={handleLedgerRowClick} 
          focusedRowEnabled={true}
         >
          <Column dataField="description" caption="Definition" />
        </DataGrid>
      </div>

      <div className="md:w-3/4 p-1">
         <DataGrid
          dataSource={filteredDefinitionDetail} 
          keyExpr="code"
          showBorders={true}
          onRowDblClick={(e) => {
            selectedRowKeys(e);
          }}
          focusedRowEnabled={true}
          onRowClick={onRowClick}
          >
          <Column dataField="objectTypeCode" caption="Object Type" />
          <Column dataField="isDebit" caption="Is Debit" />
        </DataGrid>
      </div>
    </div>
  );
};

export default DefinitionDetail;
