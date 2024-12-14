import React, {useEffect, useState,useRef } from 'react'
import TextField from '../TextField'
import CheckBox from 'devextreme-react/check-box';
import { DropDownBox } from 'devextreme-react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Lookup } from 'devextreme-react/lookup';
//import { lookup_BusinessType } from '../../api/systemConstant';
import { fetchAllLookups, fetchLookupByType } from '../../api/slice/lookupSlice';
import { fetchAllCategorys } from '../../api/slice/CategorySlice';
import { fetchAllTaxs } from '../../api/slice/TaxSlice';
import { fetchidGeneration } from '../../api/service/idGenerationService';
import TextBox from 'devextreme-react/text-box';
import { fetchAllValueFactors } from '../../api/slice/valueFactorSlice';
import { fetchAllAccountCategorys } from '../../api/slice/AccountCategorySlice';
const General = ({ onClick }) => {
  const [Code, setCode] = useState('')
  const [Name, setName] = useState('')
  const [BusinessType, setBusinessType] = useState('')
  const [TradeName, setTradeName] = useState('')
  const [TinNumber, setTinNumber] = useState('')
  const [Category, setCategory] = useState('')
  const [TaxType, setTaxType] = useState('')
  const [CreditLimit, setCreditLimit] = useState('')
  const [Parent, setParent] = useState('')
  const [DisValueFactor, setDisValueFactor] = useState('')
  const [AddValueFactor, setAddValueFactor] = useState('')
  const [IsActive, setIsActive] = useState('')
  //Addess
  const [PhoneNumber, setPhoneNumber] = useState('')
  const [Email, setEmail] = useState('')
  const [ReginalHierachy, setReginalHierachy] = useState('')
  const [AssignedPerson, setAssignedPerson] = useState('')
  const [OtherAddress, setOtherAddress] = useState('')
  const [Select, setSelect] = useState('')
  const dispatch = useDispatch();
  const { id } = useParams();
  const Business_Type = useSelector((state) => state.lookups.allLookup);
  const Tax = useSelector((state) => state.Taxs.allTax);
  const ValueFactor = useSelector((state) => state.ValueFactors.allValueFactor);



  const [tin, setTIN] =useState('');
  const [validTIN, setvalidTIN]=useState('false');
 const validateTIN = (tin) => {
  const tinpattern = /^\d{13}$/;
  return tinpattern.test(tin)
 };
const handleInputChange = (event) => {
  const inputvalue = event.target.value;
  setTIN(inputvalue);
  setvalidTIN(validateTIN(inputvalue));
};


  
  const allItems = useSelector((state) => state.Categorys.allCategory);
  const AccountCategory = useSelector((state) => state.AccountCategorys.allAccountCategory);
  const defaultIsActiveValue = true;
  const textBoxRefCode = useRef('');
  const defaultSelectValue = true;
  const { data: idGenerations } = useSelector(state => state.idGenerations);
  useEffect(() => {
  
     dispatch(fetchidGeneration("OT-004"));
     
   }, [dispatch,id]);
  
 
useEffect(() => {
  // dispatch(fetchcompany());
   //dispatch(fetchLookupByType("BusinessType"));
   dispatch(fetchidGeneration(id));
   dispatch(fetchAllLookups());
   dispatch(fetchAllTaxs());
   dispatch(fetchAllValueFactors());
   dispatch(fetchAllCategorys());
   dispatch(fetchAllAccountCategorys());
   
 }, [dispatch]);

  onclick=()=>{
    
  }
  return (  
    <div className='p-2'>
    <div className='lg:flex  justify-between gap-2  '>
      <div className='border w-full'>

      <div className='border bold w-full bg-white  margin-left: auto  display: flex font-bold'>Basic Information</div>
        <div className='w-full  bg-white p-2 '>
        <div className='w-full '>
        <TextBox ref={textBoxRefCode} className='h-10 items-center' defaultValue={idGenerations.message} value={idGenerations?.message}  />
      </div>
      <div className='w-full '>
      <TextField
      label="Name"
     value={Name}
     onChange={(e)=>setName(e.target.value)}
      inputProps={{type:'text'}}
      />
      </div>

      <div>
      <label></label>
      </div>

      <div className='w-full'>
      <Lookup
            dataSource={Business_Type?.filter(c=>c.type=="BusinessType")}
            valueExpr="id"
            displayExpr="name"
            placeholder='Select Business Type'
            searchEnabled={true} 
            //value={modeOfPayment}
            />
       
      </div>
      <div className='w-full'>
      <TextField
      label="Trade Name"
     value={TradeName}
     onChange={(e)=>setTradeName(e.target.value)}
      inputProps={{type:'text'}}
      />
      </div>
      <div className='w-full'>
      <TextField
      label="TIN No"
     value={TinNumber}
     onChange={(e)=>setTinNumber(e.target.value)}
      inputProps={{type:'text'}}
      />
      {validTIN ? (
        <p style={{ color: 'green'}}>Valid TIN</p>
      ) : (
        <p style={{ color: 'red'}}>Invalid TIN</p>
      )}
      </div>

      <div className='w-full'>
      <Lookup
             
             dataSource={allItems}
             valueExpr="code"
             displayExpr="displayOrder"
             placeholder='Select Category Type'
             searchEnabled={true} 
             //value={modeOfPayment}
             />
      </div>

      <div className='w-full'>
      <Lookup
             
            dataSource={Tax}
            valueExpr="id"
            displayExpr="description"
            placeholder='Select Tax Type'
            searchEnabled={true} 
            //value={modeOfPayment}
            />
      </div>

      <div className='w-full'>
      <TextField
      label="Credit Limit"
     value={CreditLimit}
     onChange={(e)=>setCreditLimit(e.target.value)}
      inputProps={{type:'text'}}
      />
      </div>

      <div className='w-full'>
      <Lookup
             
            dataSource={ValueFactor}
            valueExpr="id"
            displayExpr="remark"
            placeholder='Select Dis Value Factor'
            searchEnabled={true} 
            //value={modeOfPayment}
            />
      </div>
     
      <div className='w-full'>
      <Lookup
             
            dataSource={ValueFactor}
            valueExpr="id"
            displayExpr="remark"
            placeholder='Add Value Factor'
            searchEnabled={true} 
            //value={modeOfPayment}
            />
      </div>
      <div className='w-full '>
    <CheckBox
           dataField="IsActive" // Replace with the actual data field name
           text="Is Active"
           dataType="boolean"
           defaultValue={defaultIsActiveValue}
         />
        
    </div>
        </div>
          
        <div className='w-full  bg-white mt-3 font-semibold'>
          Object Tag
          
        <div className='lg:flex  justify-between gap-0 '>
        <div className='border  w-full bg-white font-bold'>
          Description
        
        <div> 
        <div className='border  w-full bg-blue-200 font-semibold'>Active</div>
        <div className='border  w-full bg-white font-semibold'>VIP</div>
        <div className='border  w-full bg-white font-semibold'>Family</div>
        </div>
        
        </div>
        <div className='border  w-full bg-white font-bold'>
          Color
          
          <div> 
        <div className='border  w-full bg-blue-200 font-semibold'>Red</div>
        <div className='border  w-full bg-white font-semibold'>Green</div>
        <div className='border  w-full bg-white font-semibold'>Blue</div>
        </div>
          </div>
        <div className='border  w-full bg-white font-bold'>
          Select
          
          <div className='w-full  bg-blue-500'>
    <CheckBox
          
          dataField="Select" // Replace with the actual data field name
          text=""
          dataType="boolean"
          defaultValue={defaultIsActiveValue}
      
        />    





        
    </div>
    <div className='w-full'>
    <CheckBox
          dataField="Select"
          dataType="boolean"
        
          text=""
        />
    </div>
    <div className='w-full '>
    <CheckBox
          value={Select}
         
          text=""
        />
    </div>
          </div>
        </div>
        
        </div>
         

      </div>
      
      <div className='w-full  bg-white p-2'>
      <div className='border  w-full bg-white font-semibold' >Adderss</div>
      
      <div className='w-full'>
      <TextField
      label="PhoneNumber I"
     value={PhoneNumber}
     onChange={(e)=>setPhoneNumber(e.target.value)}
      inputProps={{type:'text'}}
      />
      </div>

      <div className='w-full'>
      <TextField
      label="PhoneNumber II"
     value={PhoneNumber}
     onChange={(e)=>setPhoneNumber(e.target.value)}
      inputProps={{type:'text'}}
      />
      </div>
     
      <div className='w-full'>
      <TextField
      label="Email"
     value={Email}
     onChange={(e)=>setEmail(e.target.value)}
      inputProps={{type:'text'}}
      />
      </div>

      <div className='w-full'>
      < DropDownBox  
         
         label="Regional Hierachy"
         /> 
      </div>

      <div className='w-full font-bold'>
      < DropDownBox  
         
         label="Assigned Person" 
         /> 
      </div>

      <div className='w-full'>
      <TextField
      label="Other Address"
     value={OtherAddress}
     onChange={(e)=>setOtherAddress(e.target.value)}
      inputProps={{type:'text'}}
      />
      </div>

      </div>


      <div className='border  w-full bg-white font-semibold'>Set Information
      <div className='lg:flex  justify-between gap-0 '>
      <div className='border  w-full text-black bg-blue-200'>Account Category</div>
      <div className='w-full'>
      <Lookup
             
             dataSource={AccountCategory}
             valueExpr="code"
             displayExpr="description"
             placeholder='Select Account Category '
             searchEnabled={true} 
             //value={modeOfPayment}
             />
      </div>





        <div className='border  w-full  text-black bg-blue-500'>Chart Of Account</div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default General