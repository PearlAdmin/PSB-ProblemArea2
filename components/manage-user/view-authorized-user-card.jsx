'use client';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

const CardUser = ({ username: initialUsername, password: initialPassword }) => {
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

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const showFormConfirm = () => {
    setFormConfirmVisible(true);
  };
  
  const acceptSubmit = () => {
    // Save your data if needed
    setFormConfirmVisible(false);
    setIsEditing(false);
    handleSubmit();
  };

  const declineSubmit = () => {
    setFormConfirmVisible(false);
    setUsername(initialUsername);
    setPassword(initialPassword); 
    setIsEditing(false);
  };  

  const showDeleteUser = () => {
    setFormDeleteVisible(true);
  };

  const acceptSubmitDel = () => {
    // Save your data if needed
    setFormDeleteVisible(false);
    handleDelete();
  };

  const declineSubmitDel = () => {
    setFormDeleteVisible(false);
  };
  
  const handleSubmit = async (e) => {
    const response = await fetch('/api/manage-user', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(response.ok){
      window.location.reload();
      alert("User has been edited!");
    }else{
      alert("Error: User was not edited");
    }
  }

  const handleDelete = async (e) => {
    const response = await fetch('/api/manage-user', {
      method: 'DELETE',
      body: JSON.stringify({username: username}),
      headers:{
        'Content-Type': 'application/json'
      }
    });

    if(response.ok){
      window.location.reload();
      alert("User has been deleted!");
    }else{
      alert("Could not delete user!");
    }
  
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
                    onChange={(e) => {
                      setUsername(e.target.value)
                      setData({...data, username: e.target.value})
                    }
                    }/>
                ) : (
                  <input
                    type="text"
                    value={username}
                    style={{ borderColor: 'transparent' }}
                    disabled
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
      {isFormConfirmVisible && (
        <div id="form-confirm-container" style={{ display: 'block' }}>
          <div className="popup-modal" id="form-confirm-container">
            <div className="popup-modal-box-container d-flex align-items-center justify-content-center h-100 w-100">
              <div className="popup-modal-box-shadow w-50 pe-2 pb-2">
                <div className="popup-modal-box">
                  <div className="popup-modal-box-top top-100 text-end">
                    <button className="close-btn pe-4" onClick={declineSubmit}>&times;</button>
                  </div>
                  <div className="popup-modal-box-mid text-start ps-4">Are you sure you want to save edits?</div>
                  <div className="popup-modal-box-low text-start py-4 ps-4">
                    <button className="confirm-btn yes-btn" onClick={acceptSubmit}>Yes</button>
                    <button className="confirm-btn no-btn" onClick={declineSubmit}>No</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isFormDeleteVisible && (
        <div id="form-confirm-container" style={{ display: 'block' }}>
          <div className="popup-modal" id="form-confirm-container">
            <div className="popup-modal-box-container d-flex align-items-center justify-content-center h-100 w-100">
              <div className="popup-modal-box-shadow w-50 pe-2 pb-2">
                <div className="popup-modal-box">
                  <div className="popup-modal-box-top top-100 text-end">
                    <button className="close-btn pe-4" onClick={declineSubmitDel}>&times;</button>
                  </div>
                  <div className="popup-modal-box-mid text-start ps-4">Are you sure you want to delete user record?</div>
                  <div className="popup-modal-box-low text-start py-4 ps-4">
                    <button className="confirm-btn yes-btn" onClick={acceptSubmitDel}>Yes</button>
                    <button className="confirm-btn no-btn" onClick={declineSubmitDel}>No</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardUser;
