"use client";
import { useRef, useState } from 'react';
import Navbar from "@/components/navigation"
import Header from '@/components/create-record/header';
import { Button } from 'react-bootstrap';
import CustomInput from '@/components/create-record/custominput';
import useSWR from 'swr';
import styles from '@/components/create-record/styles.module.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

const CreateRecord = () => {
    const [isFormConfirmVisible, setFormConfirmVisible] = useState(false);
    const [values, setValues] = useState({});
    const errorMsg = useRef('')

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        e.target.setCustomValidity('')
    
        // Use a copy of the current values object
        let updatedValues = values;
    
        if (type === "checkbox") {
            if (!updatedValues[name]){
                updatedValues[name] = [ value ];
            } else {
                if (checked) {
                    // If the checkbox is checked, add the value to the array
                    updatedValues[name] = [...updatedValues[name], value];
                } else {
                    // If the checkbox is unchecked, remove the value from the array
                    updatedValues[name] = updatedValues[name].filter((item) => item !== value);
                }
            }
        } else {
            // For non-checkbox inputs, update the value directly
            updatedValues[name] = value;
        }
    
        // Update the state with the modified values
        setValues(updatedValues);
    };

    const submitForm = (e) => {
        e.preventDefault(); // Prevent the default form submission
        setFormConfirmVisible(true);
    }

    function validateSN(inputID) {
        const input = document.getElementById(inputID);
        const validityState = input.validity;
        console.log(validityState)
      
        if (errorMsg.current == "SN should be unique") {
          input.setCustomValidity(errorMsg.current);
        } else {
          input.setCustomValidity("");
        }
      
        input.reportValidity();
    }

    function validateSCN(inputID) {
        const input = document.getElementById(inputID);
        const validityState = input.validity;
        console.log(validityState)
      
        if (errorMsg.current == "SCN should be unique") {
          input.setCustomValidity(errorMsg.current);
        } else {
          input.setCustomValidity("");
        }
      
        input.reportValidity();
    }


    const acceptSubmit = async () => {
        // Save your data if needed
        errorMsg.current = ''

        try {
            const response = await fetch('/api/records', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
      
            if (response.ok) {
              // Handle the successful response here
              console.log('POST request was successful');
            } else {
              // Handle errors or non-2xx responses
                const data = await response.json()
                errorMsg.current = data.message
                console.error('POST request failed: ', errorMsg.current);
            }
          } catch (error) {
            console.error('An error occurred:', error);
            
        };

        validateSN('654c21139f5068a62536644f')
        validateSCN('654c21139f5068a625366454')

        setFormConfirmVisible(false);
        console.error('errMsg: ', errorMsg.current);
    }
    
    const declineSubmit = () => {
        setFormConfirmVisible(false);
    }

    const {data, isLoading, error} = useSWR('/api/forms', fetcher);

    if (isLoading) return (<div>Loading...</div>);
    
    if (error) return (<div>{error.message}</div>);

    return (
        <div>
            <Navbar />
            <form className={`${styles.body} container-fluid my-3 px-5 pt-3`} onSubmit={submitForm}>
                {/* For now lang div sa Header, since feel ko it should be part of the loop */}
                <div className={`mb-3`}><Header header='Background Information' isReadOnly={true}/></div>

                {data.questions.map((item, i) => {
                    if(item.inputType === 'header'){
                        return (<Header key={i} header={item.question} isReadOnly={true} />);
                    } else {
                        return (<CustomInput key={i} config={item} setValues={handleInputChange} />);
                    }
                })}

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button className={`${styles.button} ${styles.actionBtn} ${styles.bgBlue}`} type='submit' style={{ width: '80%', margin: '10px 25px', borderRadius: '36px' }}>
                    Create Record
                </Button>
                </div>
            </form>
            {isFormConfirmVisible && (
                <div className={`${styles.popupModal}`} id="form-confirm-container">
                    <div className={`${styles.popupModalBoxContainer}`}>
                        <div className={`${styles.popupModalBoxShadow} pe-2 pb-2`}>
                            <div className={`${styles.popupModalBox}`}>
                                <div className={`${styles.popupModalBoxTop} text-start pt-4 ps-4`}>Are you sure you want to create record?</div>
                                <div className={`popup=modal-box-low text-start py-4 ps-4`}>
                                    <button className={`${styles.button} ${styles.confirmBtn} ${styles.yesBtn}`} onClick={acceptSubmit}>Yes</button>
                                    <button className={`${styles.button} ${styles.confirmBtn} ${styles.noBtn}`} id="confirm-no-btn" onClick={declineSubmit}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default CreateRecord;