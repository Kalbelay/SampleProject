import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {DataGrid,Selection,Column} from 'devextreme-react/data-grid';
import { fetchAllLedgerDefinitions } from '../../api/slice/ledgerDefinitionSlice';

const LedgerDefinition = ({type, selectedRowKeys, onRowClick, issaved}) => {
    const all_LedgerDefinition = useSelector((state) => state.LedgerDefinitions.allLedgerDefinition);
    const [LedgerDefinition, setLedgerDefinition] = useState([])
    const dispatch = useDispatch();
    
    useEffect(() => {
       
        dispatch(fetchAllLedgerDefinitions());
        setLedgerDefinition(all_LedgerDefinition?.data)
    }, [dispatch,type,issaved]);
  
    return (
    <div className='p-2'>
      <DataGrid
            dataSource={all_LedgerDefinition}
            keyExpr="code"
            onRowClick={onRowClick}
            showBorders={true}
            onRowDblClick={(e) => selectedRowKeys(e)}
            focusedRowEnabled={true}
            columnAutoWidth={true}
            columnHidingEnabled={true}
          >
            <Column dataField="description" caption="Description" />
            <Column dataField="summaryValueType" caption="Value Type" />
            <Column dataField="summaryReferenceType" caption="Summary Reference Type" />
          </DataGrid>
</div>
  )
}

export default LedgerDefinition