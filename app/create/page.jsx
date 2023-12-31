"use client";
import { useRef, useState, useEffect } from 'react';
import Navbar from "@/components/navigation"
import Header from '@/components/create-record/header';
import Popup from '@/components/popup';
import { Button } from 'react-bootstrap';
import CustomInput from '@/components/create-record/custominput';
import useSWR from 'swr';
import styles from '@/components/create-record/styles.module.css';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import Error from '@/app/not-found';
import Loading from '@/components/loading';

/**
 * Fetcher function for fetching data from the API.
 * @function
 * @param {String} url - The URL to fetch the data from.
 * @return {Object} - The response from the API.
 */
const fetcher = (url) => fetch(url).then((res) => res.json());

/**
 * CreateRecord Page. Displays the create record page.
 * 
 * @Page
 * @return {JSX.Element} The CreateRecord component.
 */
const CreateRecord = () => {
    // State variables
    const [isFormConfirmVisible, setFormConfirmVisible] = useState(false);
    const [values, setValues] = useState({}); 
    const errorMsg = useRef('')
    const [cookies] = useCookies(['user']);
    
    // router object
    const router = useRouter();

    const handleInputChange = (e, options = null) => {
        // Destructure the event object
        const { name, value, type, checked, required, pattern } = e.target;

        // Clear the validation error message
        e.target.setCustomValidity('')
    
        // Use a copy of the current values object
        let updatedValues = values;
        
        // Update the copy of the values object
        if (type === "checkbox") {
            if (!updatedValues[name]){
                updatedValues[name] = {value: [value], options: options, required: required, type: type, version: values[name].version};
            } else {
                if (checked) {
                    // If the checkbox is checked, add the value to the array
                    // updatedValues[name] = [...updatedValues[name], value];
                    updatedValues[name].value = [...updatedValues[name].value, value];
                } else {
                    // If the checkbox is unchecked, remove the value from the array
                    updatedValues[name].value = updatedValues[name].value.filter((item) => item !== value);
                }
            }
        } else if (type === "radio") {
            updatedValues[name] = {value: value, options: options, required: required, type: type, order: values[name].order, version: values[name].version};
        } else {
            // For non-checkbox inputs, update the value directly
            let dbType = type
            if(type === "text") {
                switch (pattern){
                    case '^([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$':
                        dbType = "number"; break;
                    case '[a-zA-Z0-9]+':
                        dbType = "alphanumeric"; break;
                    default:
                        dbType = "text"; break;
                }
            }
            updatedValues[name] = {value: value, required: required, type: dbType, order: values[name].order, version: values[name].version};
        }
    
        // Update the state with the modified values
        setValues(updatedValues);
    };

    // Handle the form submission
    const submitForm = (e) => {
        e.preventDefault(); // Prevent the default form submission
        setFormConfirmVisible(true);
    }

    // Handle the form submission
    function validateSCN(inputID) {
        const input = document.getElementById(inputID);
        const validityState = input.validity;
      
        if (errorMsg.current == "SCN should be unique") {
          input.setCustomValidity(errorMsg.current);
          alert(errorMsg.current);
        } else {
          input.setCustomValidity("");
        }
      
        input.reportValidity();
    }

    // Handle acceptance of the form submission.
    const acceptSubmit = async () => {
        // Save your data if needed
        errorMsg.current = ''
        
        try {
            const response = await fetch('/api/records', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({...values, 'createdBy': cookies.user.username}),
            });
      
            if (response.ok) {
              // Handle the successful response here
              console.log('POST request was successful');
              alert('Record created successfully');
              router.push('/');
            } else {
              // Handle errors or non-2xx responses
                const data = await response.json()
                errorMsg.current = data.message
                console.error('POST request failed: ', errorMsg.current);
            }
          } catch (error) {
            console.error('An error occurred:', error);
        };

        // validate unique SCN
        validateSCN('SCN: ')

        setFormConfirmVisible(false);
        console.error('errMsg: ', errorMsg.current);
    }
    
    // Handle the rejection of the form submission.
    const declineSubmit = () => {
        setFormConfirmVisible(false);
    }
    //cookie checker if exist  load dis  if not 
    const {data, isLoading, error} = useSWR('/api/forms', fetcher);

    // Initialize the values object
    useEffect(() =>{
        let initiateValues = values
        if (data) {
            data.questions.map((item, i) => {
                if(item.inputType === 'header'){
                    initiateValues[item.question] = {value: null, required: false, type: item.inputType, order: item.number, version: item.version}
                } else if(item.inputType === 'checkbox'){
                    initiateValues[item.question] = {value: [], options:item.choices, required: false, type: item.inputType, order: item.number, version: item.version}
                } else if(item.inputType === 'radio'){
                    initiateValues[item.question] = {value: '', options:item.choices, required: false, type: item.inputType, order: item.number, version: item.version}
                } else {
                    initiateValues[item.question] = {value: '', required: false, type: item.inputType, order: item.number, version: item.version}
                }
            })
            setValues(initiateValues)
        }
    }, [data])

    // Check if the data is loading or if there is an error
    if (isLoading) return (<Loading/>);
    
    // Check if there is an error
    if (error) return (<Error/>);

    return (
        <div>
            <Navbar />
            <form className={`${styles.body} container-fluid my-3 px-2 pt-1 px-md-5 pt-md-3`} onSubmit={submitForm}>
                {data.questions.map((item, i) => {
                    if(item.inputType === 'header'){
                        return (
                            <>
                                <Header key={i} header={item.question} isReadOnly={true} />
                                <div className="mb-3"></div>
                            </>
                        );
                    } else {
                        return (<CustomInput key={i} config={item} setValues={handleInputChange} order={i}/>);
                    }
                })}

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button className={`${styles.button} ${styles.actionBtn} ${styles.bgBlue} w-50`} type='submit'>
                    Create Record
                </Button>
                </div>
            </form>
            {isFormConfirmVisible && <Popup question={"Are you sure you want to create record?"} firstBtnLabel={"Yes"} secondBtnLabel={"No"} firstBtnFunc={acceptSubmit} secondBtnFunc={declineSubmit} isYesNoQuestion={true}/>}
        </div>
    );
};

export default CreateRecord;