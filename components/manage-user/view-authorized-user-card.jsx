'use client';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Popup from '../popup';

/**
 * CardUser component for displaying user information in a card format.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.username - The initial username of the user.
 * @param {string} props.password - The initial password of the user.
 * @param {string} props.searchText - The search text for filtering users.
 * @param {number} props.pageNum - The page number for pagination.
 * @returns {JSX.Element} - The CardUser component JSX.
 */
const CardUser = ({ username: initialUsername, password: initialPassword, searchText, pageNum}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState(initialPassword);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormConfirmVisible, setFormConfirmVisible] = useState(false);
  const [isFormDeleteVisible, setFormDeleteVisible] = useState(false);

  

  const[data, setData] = useState({
    lookup: initialUsername,
    username: initialUsername,
    password: initialPassword,
  });

    /**
   * Toggles the visibility of the user's password.
   * @function
   */
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  
    /**
   * Toggles the editing mode for the user information.
   * @function
   */
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

    /**
   * Displays the confirmation of the form.
   * @function
   */
  const showFormConfirm = () => {
    setFormConfirmVisible(true);
  };


    /**
   * Handles the submission of the user information form.
   * @function
   */
  const acceptSubmit = () => {
    // Save your data if needed
    setFormConfirmVisible(false);
    setIsEditing(false);
    handleSubmit();
  };

  /**
   * Declines the submission of the user information form.
   * @function
   */
  const declineSubmit = () => {
    setFormConfirmVisible(false);
    setUsername(initialUsername);
    setPassword(initialPassword); 
    setIsEditing(false);
  };  

    /**
   * Displays the confirmation form for deleting a user.
   * @function
   */
  const showDeleteUser = () => {
    setFormDeleteVisible(true);
  };

    /**
   * Handles the submission of the user deletion form.
   * @function
   */
  const acceptSubmitDel = () => {
    // Save your data if needed
    setFormDeleteVisible(false);
    handleDelete();
  };

  /**
   * Declines the submission of the user deletion form.
   * @function
   */
  const declineSubmitDel = () => {
    setFormDeleteVisible(false);
  };

  /**
   * Handles the submission of the user information for editing.
   * @async
   * @function
   * @param {Event} e - The event object.
   */
  const handleSubmit = async (e) => {
    //send put request to the api with a JSON body attached. 
    const response = await fetch('/api/manage-user', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    //handle response from api
    if(response.ok){
      window.location.reload();
      alert("User has been edited!");
    }else{
      window.location.reload();
      alert("Error: User was not edited");
    }
  }
    /**
   * Handles the submission of the user deletion.
   * @async
   * @function
   * @param {Event} e - The event object.
   */
  const handleDelete = async (e) => {
    //send delete request to the api with a JSON body attached. 
    const response = await fetch('/api/manage-user', {
      method: 'DELETE',
      body: JSON.stringify({username: username}),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    //handle response from api.
    if(response.ok){
      window.location.reload();
      alert("User has been deleted!");
    }else{
      alert("Could not delete user!");
    }
  }

  //The following code bellow is used for pagination.
  const [state, setState] = useState(pageNum);
  const [search, setSearch] = useState(searchText);

  if (state !== pageNum) {
    setState(pageNum);
    setUsername(initialUsername);
    setPassword(initialPassword);
  }

  if (search !== searchText) {
    setSearch(searchText);
    setUsername(initialUsername);
    setPassword(initialPassword);
  }

  return (
    <div>
      <Card className="mb-1">
        <div className="d-flex flex-row align-items-center px-2">
          <div className="flex-grow-1 mt-1" style={{minWidth:'200px'}}>
            <div className="ml-2">
            <h6 className="mb-0">
                <span>Username: &nbsp;</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={username}
                    style={{width: '200px'}}
                    pattern="[a-zA-Z0-9 ]+"
                    onChange={(e) => {
                      const withEmojis = /\p{Extended_Pictographic}/u
                      const pattern = /^[a-zA-Z0-9 ]+$/
                      if (e.target.value == '') {
                        setUsername(e.target.value)
                        setData({...data, username: e.target.value})
                      } else if (withEmojis.test(e.target.value) || !pattern.test(e.target.value)) {
                        alert('Username cannot contain special characters...');
                      } else {
                        setUsername(e.target.value)
                        setData({...data, username: e.target.value})
                      }
                    }
                    
                    }/>
                ) : (
                  <input
                    type="text"
                    value={username}
                    style={{ borderColor: 'transparent' }}
                    disabled
                    pattern="[a-zA-Z0-9 ]+"
                  />
                )}
              </h6>
              <h6>
                <span>Password: &nbsp;</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={password}
                    style={{width: '200px'}}
                    onChange={(e) =>{
                      setPassword(e.target.value)
                      setData({...data, password: e.target.value})
                    } 
                }/>
                ) : (
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    style={{ borderColor: 'transparent' }}
                    disabled
                  />
                )}
              </h6>
            </div>
          </div>
          <div className="p-0" style={{ cursor: 'pointer' }}>
            <button type="button" className="btn btn-light showPasswordUser" onClick={togglePassword}>
              {showPassword ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
            </button>
          </div>
          <div className="p-0" style={{ cursor: 'pointer' }}>
            <button type="button" className="btn btn-light edit-icon" onClick={isEditing ? showFormConfirm : toggleEdit}>
              {isEditing ? <i className="bi bi-save2"></i> : <i className="bi bi-pencil-square"></i>}
            </button>
          </div>
          <div className="p-0" style={{ cursor: 'pointer' }}>
            <button type="button" className="btn btn-light edit-icon" onClick={showDeleteUser}>
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </Card>
      {isFormConfirmVisible && <Popup question={"Are you sure you want to save edits?"} firstBtnLabel={"Yes"} secondBtnLabel={"No"} firstBtnFunc={acceptSubmit} secondBtnFunc={declineSubmit} isYesNoQuestion={true}/>}
      {isFormDeleteVisible && <Popup question={"Are you sure you want to delete user record?"} firstBtnLabel={"Yes"} secondBtnLabel={"No"} firstBtnFunc={acceptSubmitDel} secondBtnFunc={declineSubmitDel} isYesNoQuestion={true}/>}
    </div>
  );
};

export default CardUser;
