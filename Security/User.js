import React, { useEffect, useState } from "react";
import { Button } from "devextreme-react/button";
import { useSelector, useDispatch } from "react-redux";
import TabPanel, { Item } from "devextreme-react/tab-panel";
import { DataGrid, Column, Pager, Paging } from "devextreme-react/data-grid";
import { Lookup } from "devextreme-react/lookup";
import notify from "devextreme/ui/notify";
import {
  addNewUser,
  fetchAllUsers,
  updateExistingUser,
} from "../../../api/slice/UserSlice";
import {
  addNewRole,
  fetchAllRoles,
  removeExistingRole,
  updateExistingRole,
} from "../../../api/slice/RoleSlice";
import TextField from "../../../components/TextField";
import { documentService } from "../../../api/service/documentService";
import { fetchAllPersonalDetails } from "../../../api/slice/personalDetailSlice";
import UserService from "../../../api/service/UserService";
import { unwrapResult } from '@reduxjs/toolkit';
import axios from "axios";
import { env } from "../../../api/environment";
import { User_config } from "../../../api/systemConstant";
import Role from "../../../components/Security/Role";
import RoleManagment from "../../../components/Security/RoleManagment";
import { addNewUserRoleMapper, fetchActiveUsers, fetchAllUserRoleMappers, updateExistingUserRoleMapper } from "../../../api/slice/UserMembershipSlice";
import UserRoleMapperService from "../../../api/service/UserRoleMapperService";

const User = () => {
  const all_User = useSelector((state) => state.Users.allUser);
  const all_person = useSelector((state) => state.PersonalDetails?.allPersonalDetail);

  const all_users = useSelector((state) => state.UserMemberships?.activeUsers);
  const status = useSelector((state) => state.UserMemberships?.status);

  const dispatch = useDispatch();
  const BASE_URL = env;
  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllPersonalDetails());
    getUser();
    getStrongPassword();
    getRole();
    dispatch(fetchActiveUsers());
    getMembership();
    dispatch(fetchAllRoles());
  }, [dispatch]);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await UserService.getActivePersons(); 
        setEmployees(data); 
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    loadEmployees();
  }, []);

  //for user name
  useEffect(() => {
    const loadActiveUsers = async () => {
      const users = await UserRoleMapperService.fetchActiveUsers();
      setUsernames(users.map(user => user.userName)); // Extract usernames
    };

    loadActiveUsers();
  }, []);

  const getStrongPassword = () => {
    return axios
      .get(`${BASE_URL}Configuration/GetConfigurationByAttribute`, {
        params: {
          objectType: 'OT-0099',  
          attribute: 'StrongPassword',
        },
      })
      .then((response) => {
        console.log("Full response:", response);
        const current = response?.data?.data?.current;  
        console.log("Fetched 'current' value:", current);
  
        if (current && current.toLowerCase() === "true") {
          setIsStrongPasswordRequired(true);  
        } else {
          setIsStrongPasswordRequired(false);  
        }
      })
      .catch((error) => {
        console.error('Error fetching configuration:', error);
      });
  };
  
  // user
  const [isStrongPasswordRequired, setIsStrongPasswordRequired] = useState(false);
  const [showPrint, setshowPrint] = React.useState(false);
  const [showModalUser, setshowModalUser] = React.useState(false);
  const [isSaved, setisSaved] = React.useState(false);
  const [employees, setEmployees] = useState([]);
  const [id, setId] = useState('');
  const [UserName, setUserName] = React.useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [AllowMultipleUser , setAllowMultipleUser] = useState(false);
  const [IsActive, setIsActive] = useState(true)
  const [selectedEmployee, setSelectedEmployee] = useState({});
  // role
  const [RoleId, setRoleId] = useState("");
  const [Index, setIndex] = useState(0)
  const [Description, setDescription] = useState("");
  const [showModalRole, setshowModalRole] = React.useState(false);
  const [FocusedRow, setFocusedRow] = useState('')
  const [showDelete, setshowDelete] = React.useState(false);
  const [errDescription, setErrDescription] = useState("");
  // User Member
  //const { activeUsers, status } = useSelector((state) => state.UserMemberships);
  const [userId, setUserId] = useState("");
  const [UserCode, setUserCode] = useState("");
  const [RoleCode, setRoleCode] = useState("");
  const [ExpiryDate, setExpiryDate] = useState("");
  const [selectedRole, setselectedRole]=useState('');
  const [usernames, setUsernames] = useState([]);
  const [showModalUserMember, setShowModalUserMember] = React.useState(false);
  const [errUserCode, setErrorUserCode] = useState("");
  const [errExpiryDate, setErrorExpiryDate] = useState("");
  const [selectedType, setselectedType] = useState(1);


  const [showModalUIAccess, setShowModalUIAccess] = useState(false);
  const [showModalRoleOperation, setShowModalRoleOperation] = useState(false);
  const [showModalRoleAccess, setShowModalRoleAccess] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState(null);

  const formattedUsernames = usernames.map(username => ({userName: username }));  // This should match `valueExpr` and `displayExpr`
  

const handleUsernameChange = (value) => {
  setSelectedUsername(value);
  setUserCode(value); // Set the selected user code or identifier here
};

  
  const onFocusedRowChanging = (e) => {
    setselectedType(e?.key);
  };
  const CheckRole = async()=>{ 
    let isValid = true;
    if(Description===""){
      setErrDescription(true);
      isValid = false;
    }
    return isValid;
  }

  const checkMembership = async()=>{
    let isValid = true;
    if(selectedUsername===""){
      setErrorUserCode(true);
      isValid = false;
    } else if(ExpiryDate===""){
      setErrorExpiryDate(true);
      isValid = false;
    }
    return isValid;
  }
      const OnIsActive=(e)=>{
        setIsActive(e.target.checked)
      } 
      const OnAllowMultipleUser=(e)=>{
        setAllowMultipleUser(e.target.checked)
      }
        
      const handlePassword = (e) => {
        setPassword(e.target.value);
        setErrPassword("");
      };
      const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setErrConfirmPassword("");
      };
      const ResetUser =()=>{
        setId("");
        setSelectedEmployee("");
        setUserName("");
        setPassword("");
        setConfirmPassword("");
        setAllowMultipleUser("");
        setIsActive(true);
      }
      
     const RefreshPage =()=>{
      dispatch(fetchAllUsers());
      ResetUser();                
      setisSaved(!isSaved);           
      setshowModalUser(false);    
     }
   
     const selectedRowKeys = (e) => {
      if(Index===0){
      console.log("selectedEmployee", e?.data?.selectedEmployee);  
      console.log("employeeCode", e?.data?.employeeCode);      
      const employee = employees.find(emp => emp.firstName === e?.data?.employeeCode);     
      if (employee) {
        setSelectedEmployee(employee);  
      } else {
        setSelectedEmployee({});  
        console.error("Employee not found");
      }
      setId(e?.data?.code);
      setUserName(e?.data?.userName);
      setPassword(e?.data?.password);
      setConfirmPassword(e?.data?.password);
      setAllowMultipleUser(e?.data?.allowMultipleUser);
      setIsActive(e?.data?.isActive);
      setshowModalUser(!showModalUser);
    } else if(Index===1){
      setDescription(e?.data?.description);
      setRoleId(e?.data?.code);
      setshowModalRole(!showModalRole);
    }
    };
    
     const getselectedIndex = (newIndex) => {
      setIndex(newIndex);
      // Reset all modals
      setShowModalUserMember(false);
      setShowModalUIAccess(false);
      setShowModalRoleOperation(false);
      setShowModalRoleAccess(false);
    };
     const onFocusedRow =(e)=>{
      setFocusedRow(e.key);
     }
                          
    const onFocusedUserRoleRow = (e) => {
      setFocusedRow(e.key);
      setUserCode(e?.data?.userCode); // Ensure this refers to the correct user code field
      setRoleCode(e?.data?.roleCode); // Ensure this refers to the correct role code field
      setselectedRole(e?.data?.description); // Role description
  };
  
  const onNewClick = () => {
    if(Index===0){
    setshowModalUser(true);
  } else if(Index===1){
    setshowModalRole(true);
    ResetRole(); 
    setErrDescription(false);  
  } else if(Index===2 && selectedType === 1){
    if (selectedRole) {
              setShowModalUserMember(true);
           } else {
               notify("First Select Role", "error", 2000); // Show error if no role is selected
            }
  } else if(Index===2 && selectedType === 3){
    setShowModalRoleOperation(true);
  }
  };
  
  
  const onDeleteClick = ()=>{
    setshowDelete(!showDelete)
  };
  const DeleteValue = () => {
    if(Index===0){
      
    } else if(Index===1){
      dispatch(removeExistingRole(FocusedRow)).then(() =>{
        dispatch(fetchAllRoles());
        ResetRole();
        setisSaved(!isSaved);
        setshowDelete(!showDelete);
        notify("deleted successfully!", "error", 2000);
      });
       }
  };
const handleEmployeeSelection = (e) => {
  const selectedEmployee = employees.find(emp => emp.firstName === e.value); 

  if (selectedEmployee) {
    setSelectedEmployee(selectedEmployee); 
    setUserName(selectedEmployee.suggestedUserName); 
  } else {
    console.error("Selected employee not found");
  }
};

  const onPrintClick = () => {
    setshowPrint(true);
  };
  const [errPassword, setErrPassword] = useState("");
  const [errLength, setErrLength] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [errConfirmPasswordMatch, setErrConfirmPasswordMatch] = useState("");
  const [errEmployee, setErrEmployee]= useState('');
  const [errUserName, setErrUserName]= useState('');
 
// Define validatePassword as a standalone function
const validatePassword = async (password) => {
  // Fetch the configuration first
  await getStrongPassword();

  const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  let isValid = true;

  if (!password) {
    setErrPassword(true);
    setErrLength(false);
    isValid = false;
  } else if (isStrongPasswordRequired && !strongPasswordPattern.test(password)) {
    setErrPassword(false); 
    setErrLength(true);    
    isValid = false;
  } else {
    setErrPassword(false);  
    setErrLength(false);    
    isValid = true;
  }
  return isValid;
};
 
// validation
const checkUser = async () => {
  let isValid = true;

  // Validate selected employee
  if (selectedEmployee === "") {
    setErrEmployee(true);
    isValid = false;
  } else {
    setErrEmployee(false);
  }

  // Validate username
  if (UserName === "") {
    setErrUserName(true);
    isValid = false;
  } else {
    try {
      const url = id 
        ? `${BASE_URL}User/check-username/${UserName}/${id}` 
        : `${BASE_URL}User/check-username/${UserName}`;
  
      const response = await axios.get(url);
      if (response.data.exists) {
        notify("Username already exists", "error", 2000);
        isValid = false;
      } else {
        setErrUserName(false);
      }
    } catch (error) {
      console.error("Error checking username:", error);
      notify("An error occurred while checking username!", "error", 2000);
      isValid = false;
    }
  }

  // Validate confirm password
  if (!confirmPassword) {
    setErrConfirmPassword(true);
    isValid = false;
  } else if (password !== confirmPassword) {
    setErrConfirmPasswordMatch(true);
    isValid = false;
  } else {
    setErrConfirmPassword(false);
    setErrConfirmPasswordMatch(false);
  }

  return isValid;
};


const getUser =()=>{
  documentService.getAll("User?PageNumber=1&PageSize=200")
  .then(()=>{
    (
      dispatch(fetchAllUsers())
    );
  });
}
const getRole =()=>{
  documentService.getAll("Role?PageNumber=1&PageSize=200")
  .then(()=>{
    (dispatch(fetchAllRoles()));
  });
}
const getMembership =()=>{
  documentService.getAll("UserRoleMapper?PageNumber=1&PageSize=200")
  .then(()=>{
    (dispatch(fetchAllUserRoleMappers()));
  });
}

const ResetRole = ()=>{
  setDescription("");  
  setErrDescription(false);
}
const RefreshRole = () => {  
  dispatch(fetchAllRoles());
  ResetRole();                
  setisSaved(!isSaved);           
  setshowModalRole(false);    
};
const ResetMember =()=>{
  setUserId("");
  setUserCode("");
  setRoleCode("");
  setExpiryDate("");
}
const RefreshMembership = ()=>{
dispatch(fetchAllUserRoleMappers());
ResetMember();
setisSaved(!isSaved);
setShowModalUserMember(false);
};
const SaveRole = async () => {
 let isRoleValid = await CheckRole();
 if(isRoleValid){
  var val = {
      description: Description,
  };
  if (RoleId) {
      val.code = RoleId; // Ensure this is correct
      dispatch(updateExistingRole({ id: RoleId, updatedItem: val })).then(RefreshRole); // Pass correct arguments
      notify("Updated Successfully", "success", 200);
  } else {
      dispatch(addNewRole(val)).then(RefreshRole);
      notify("Saved successfully!", "success", 2000);
  }
  setRoleId("");
  setshowModalRole(false);
  ResetRole();
 };
}


const SaveUserMember = async () => {
  let isMembershipValid = await checkMembership();
  if (isMembershipValid) {
      const val = {
          userCode: UserCode, // This should hold the selected user
          roleCode: RoleCode,
          expiryDate: ExpiryDate,
      };
      if (userId) {
          val.code = userId;
          dispatch(updateExistingUserRoleMapper({ id: userId, updatedItem: val })).then(RefreshMembership);
          notify("Updated Successfully", "success", 200);
      } else {
          dispatch(addNewUserRoleMapper(val)).then(RefreshMembership);
          notify("Saved successfully!", "success", 2000);
      }
      setUserId("");
      setShowModalUserMember(false);
      ResetMember();
  }
};

const SaveRoleOperation = async() =>{

}
const SaveUser = async () => {
  // First, validate the password
  const isPasswordValid = await validatePassword(password);

  // If the password is invalid, stop the function execution
  if (!isPasswordValid) {
    notify("Password is invalid!", "error", 2000);
    return;
  }

  // Proceed with other validation
  let isUserValid = await checkUser(); // Ensure checkUser is awaited
  if (isUserValid) {
    const val = {
      employeeCode: selectedEmployee?.firstName || '',
      userName: UserName,
      password: password,
      allowMultipleUser: AllowMultipleUser,
      isActive: IsActive,
    };
   
    try {
      let actionResult;
      if (id) {
        val.code = id;
        actionResult = await dispatch(updateExistingUser({ UserId: id, updatedItem: val }));
      } else {
        actionResult = await dispatch(addNewUser(val));
      }

      const result = unwrapResult(actionResult);
      if (result) {
        notify(id ? "Updated successfully!" : "Saved successfully!", "success", 2000);
      } else {
        notify("This item already exists!", "error", 2000);
      }
      RefreshPage();
    } catch (error) {
      console.error('Failed to save/update user:', error);
      notify("An error occurred!", "error", 2000);
    }

    // Clear the ID after the operation
    setId("");
  }
};

return (
    <React.Fragment>
      <div className="flex py-2 px-2">
        <div className="lg:flex md:col-3 sm:col-1  space-x-3 space-y-2 items-center">
          <div className="flex space-x-3 ">
            <Button icon="file" text="New" onClick={onNewClick} />
            <Button icon="remove" text="Delete"  onClick={onDeleteClick}
            />
            <Button icon="print" text="Print" onClick={onPrintClick} />
          </div>
        </div>
      </div>
      <div>
        <div className="md:flex sm:grid-cols-2 gap-3 px-2 py-1 h-full">
          <div className="md:w-full bg-white rounded flex justify-start h-screen">
            <TabPanel onSelectedIndexChange={(e)=>getselectedIndex(e)}>
            <Item title="User Account">
  <DataGrid
    dataSource={all_User}
    keyExpr="code"
    showBorders={true}
    focusedRowEnabled={true}
    columnAutoWidth={true}
    columnHidingEnabled={true}
    onRowDblClick={(e) => selectedRowKeys(e)}
    onEditorPreparing={(e) => {
      if (e.dataField === "employeeCode" && e.row?.data?.code) {
        e.editorOptions.disabled = true;
      }
    }}
    onRowUpdating={(e) => {
      delete e.newData.employeeCode;
    }}
  >
    <Column dataField="employeeCode" caption="Employee Name" />
    <Column dataField="userName" caption="User Name" />
    <Column dataField="isActive" dataType="boolean" caption="Is Active" />
  </DataGrid>
</Item>
<Item title="Role">
          <Role 
                  issaved={isSaved}
                  selectedRowKeys={(e)=>selectedRowKeys(e)} 
                  onRowClick={onFocusedRow} />  
</Item>
<Item title="Role managment">
<RoleManagment 
                  issaved={isSaved}
                  type={selectedType}
                  selectedRowKeys={(e)=>selectedRowKeys(e)} 
                  onRowClick={onFocusedUserRoleRow} />  
</Item>

<Item title="functionality"></Item>
  </TabPanel>
          </div>
        </div>
      </div>
      <>
        {showModalUser ? (
          <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    User
                  </p>
                  <button  
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setshowModalUser(!showModalUser)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5 space-y-4 ">
                  <div className="lg:flex gap-4">
                    <div className="w-full">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div className="w-full ">
                        <p>Employee</p>
                        <Lookup
                           dataSource={employees}
                           valueExpr="firstName"  
                           displayExpr="firstName"  
                           placeholder="Select Employee"
                           searchEnabled={true}
                           onValueChanged={handleEmployeeSelection}
                           value={selectedEmployee?.firstName}  
                           disabled={!!id}  
                           readOnly={!!id}  
                         />

                          {errEmployee ? (
                        <div className="flex justify-center">
                          <span className="text-red-600 text-base">Employee is required!</span>
                        </div>
                      ): null
                    }
                        </div>

                        <div className="w-full ">
                          <TextField
                            label="User Name"
                            value={UserName}
                            required
                            onChange={(e) => setUserName(e.target.value)}
                            inputProps={{ type: "text" }}
                          />
                             {errUserName ? (
                        <div className="flex justify-center">
                          <span className="text-red-600 text-base">User Name is required!</span>
                        </div>
                      ): null
                    }
                        </div>
                        <div className="w-full ">
                          <TextField
                            label="Password"
                            value={password}
                            onChange={handlePassword}
                            inputProps={{ type: "password" }}
                          />
                          {errPassword ? (
                        <div className="flex justify-center">
                          <span className="text-red-600 text-base">Password is required!</span>
                        </div>
                      ): null
                    }
                     {errLength ? (
                        <div className="flex justify-center">
                          <span className="text-red-600 text-base">"Password must be at least 8 characters long, with uppercase, lowercase, a number, and a special character."</span>
                        </div>
                      ): null
                    }
                        </div>
                        <div className="w-full ">
                          <TextField
                            label="Confirm Password"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            inputProps={{ type: "password" }}
                          />
                           {errConfirmPassword ? (
                        <div className="flex justify-center">
                          <span className="text-red-600 text-base">Confirm your Password!</span>
                        </div>
                      ): null
                    }
                     {errConfirmPasswordMatch ? (
                        <div className="flex justify-center">
                          <span className="text-red-600 text-base">Passwords do not match!</span>
                        </div>
                      ): null
                    }
                        </div>
                        <div className='w-full mt-6'>
      <input id="default-checkbox" type="checkbox" checked={AllowMultipleUser} onChange={(e)=>OnAllowMultipleUser(e)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Allow Multiple User</label>
      </div>
                        <div className='w-full mt-6'>
      <input id="default-checkbox" type="checkbox" checked={IsActive} onChange={(e)=>OnIsActive(e)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is Active</label>
      </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={SaveUser}
                  >
                    Save
                  </button>
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalRole ? (
          <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    Role
                  </p>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setshowModalRole(!showModalRole)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5 space-y-4 ">
                  <div className="lg:flex gap-4">
                    <div className="w-full">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >

                        <div className="w-full ">
                          <TextField
                            label="Description"
                            value={Description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            inputProps={{ type: "text" }}
                          />
                             {errDescription ? (
                        <div className="flex justify-center">
                          <span className="text-red-600 text-base"> Description is required!</span>
                        </div>
                      ): null
                    }
                        </div>
                       
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={SaveRole}
                  >
                    Save
                  </button>
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
         {showModalUserMember ? (
          <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                   Membership
                  </p>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setShowModalUserMember(!showModalUserMember)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5 space-y-4 ">
                  <div className="lg:flex gap-4">
                    <div className="w-full">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >

<div className="w-full">
    <p>User Name</p>
    <Lookup
        dataSource={formattedUsernames} // Pass the formatted data
        valueExpr="userName" // Unique identifier (field in the object)
        displayExpr="userName" // Field to display in the dropdown
        placeholder="Select Username"
        searchEnabled={true} // Enable search functionality
        onValueChanged={(e) => handleUsernameChange(e.value)} // Adjust handler
        value={selectedUsername} // Pre-selected username if needed
    />
     {errUserCode? (
                        <div className="flex justify-center">
                          <span className="text-red-600 text-base"> This field is required!</span>
                        </div>
                      ): null
                    }
</div>
                        <div className="w-full">
                    <TextField
                      label="Expiry Date"
                      value={ExpiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      inputProps={{ type: "date" }}
                    />
                     {errExpiryDate ? (
                        <div className="flex justify-center">
                          <span className="text-red-600 text-base"> This field is required!</span>
                        </div>
                      ): null
                    }
                  </div>
                       
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={SaveUserMember}
                  >
                    Save
                  </button>
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalRoleOperation ? (
          <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                   Role Operation
                  </p>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setShowModalRoleOperation(!showModalRoleOperation)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5 space-y-4 ">
                  <div className="lg:flex gap-4">
                    <div className="w-full">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >

                   <div className="w-full ">
                          <TextField
                            label="Description"
                            value={Description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            inputProps={{ type: "text" }}
                          />
                             {errDescription ? (
                        <div className="flex justify-center">
                          <span className="text-red-600 text-base"> This field is required!</span>
                        </div>
                      ): null
                    }
                    </div>
                        <div className="w-full">
                    <TextField
                      label="Expiry Date"
                      value={ExpiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      inputProps={{ type: "date" }}
                    />
                     {errExpiryDate ? (
                        <div className="flex justify-center">
                          <span className="text-red-600 text-base"> This field is required!</span>
                        </div>
                      ): null
                    }
                  </div>
                       
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={SaveRoleOperation}
                  >
                    Save
                  </button>
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showDelete ? (
          <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <button
                  type="button"
                  class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="deleteModal"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span
                    class="sr-only"
                    onClick={() => setshowDelete(!showDelete)}
                  >
                    Close modal
                  </span>
                </button>
                <svg
                  className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p className="mb-4 text-gray-500 dark:text-gray-300">
                  Are you sure you want to delete this item?
                </p>
                <div className="flex justify-center items-center space-x-4">
                  <button
                    data-modal-toggle="deleteModal"
                    type="button"
                    class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => setshowDelete(!showDelete)}
                  >
                    No, cancel
                  </button>
                  <button
                    type="submit"
                    class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={DeleteValue}
                  >
                    Yes, I'm sure
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    </React.Fragment>
  );
};
export default User;
