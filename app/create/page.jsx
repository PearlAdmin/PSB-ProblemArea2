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

const fetcher = (url) => fetch(url).then((res) => res.json());

const CreateRecord = () => {
    const [isFormConfirmVisible, setFormConfirmVisible] = useState(false);
    const [values, setValues] = useState({});
    const errorMsg = useRef('')
    const [cookies, setCookie] = useCookies(['user']);
    const currentUser = cookies.user.username;
    const router = useRouter();

    const handleInputChange = (e, options = null) => {
        const { name, value, type, checked, required, pattern } = e.target;

        console.log("id: ", e.target.id);
        e.target.setCustomValidity('')
    
        // Use a copy of the current values object
        let updatedValues = values;
    
        // values = {prop1: {value: any, 
        //                   required: bool, 
        //                   type: string},
        //           prop2: {value: [any], 
        //                   options: [any]
        //                   required: bool, 
        //                   type: string},
        //          }
        
        if (type === "checkbox") {
            if (!updatedValues[name]){
                // updatedValues[name] = [ value ];
                updatedValues[name] = {value: [value], options: options, required: required, type: type};
            } else {
                if (checked) {
                    console.log("in checked")
                    // If the checkbox is checked, add the value to the array
                    // updatedValues[name] = [...updatedValues[name], value];
                    updatedValues[name].value = [...updatedValues[name].value, value];
                } else {
                    // If the checkbox is unchecked, remove the value from the array
                    updatedValues[name].value = updatedValues[name].value.filter((item) => item !== value);
                }
            }
        } else if (type === "radio") {
            updatedValues[name] = {value: value, options: options, required: required, type: type, order: values[name].order};
        } else {
            // For non-checkbox inputs, update the value directly
            // updatedValues[name] = value;
            let dbType = type
            if(type === "text") {
                switch (pattern){
                    case '[0-9]+':
                        dbType = "number"; break;
                    case '[a-zA-Z0-9]+':
                        dbType = "alphanumeric"; break;
                    default:
                        dbType = "text"; break;
                }
            }
            updatedValues[name] = {value: value, required: required, type: dbType, order: values[name].order};
        }
    
        // Update the state with the modified values
        setValues(updatedValues);
        console.log(values)
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
          alert(errorMsg.current);
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
          alert(errorMsg.current);
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
              body: JSON.stringify({...values, 'createdBy': currentUser}),
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

        validateSN('SN: ')
        validateSCN('SCN: ')

        setFormConfirmVisible(false);
        console.error('errMsg: ', errorMsg.current);
    }
    
    const declineSubmit = () => {
        setFormConfirmVisible(false);
    }
    //cookie checker if exist  load dis  if not 
    const {data, isLoading, error} = useSWR('/api/forms', fetcher);

    useEffect(() =>{
        let initiateValues = values
        if (data) {
            data.questions.map((item, i) => {
                if(item.inputType === 'header'){
                    initiateValues[item.question] = {value: null, required: false, type: item.inputType, order: item.number}
                } else if(item.inputType === 'checkbox'){
                    initiateValues[item.question] = {value: [], options:item.choices, required: false, type: item.inputType, order: item.number}
                } else if(item.inputType === 'radio'){
                    initiateValues[item.question] = {value: '', options:item.choices, required: false, type: item.inputType, order: item.number}
                } else {
                    initiateValues[item.question] = {value: '', required: false, type: item.inputType, order: item.number}
                }
            })
            setValues(initiateValues)
        }
    }, [data])

    if (isLoading) return (<div>Loading...</div>);
    
    //TODO: error page load component
    if (error) return (<div>Error...</div>);

    return (
        <div>
            <Navbar />
            <form className={`${styles.body} container-fluid my-3 px-5 pt-3`} onSubmit={submitForm}>
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
                <Button className={`${styles.button} ${styles.actionBtn} ${styles.bgBlue}`} type='submit' style={{ width: '80%', margin: '10px 25px', borderRadius: '36px' }}>
                    Create Record
                </Button>
                </div>
            </form>
            {isFormConfirmVisible && <Popup question={"Are you sure you want to create record?"} firstBtnLabel={"Yes"} secondBtnLabel={"No"} firstBtnFunc={acceptSubmit} secondBtnFunc={declineSubmit} isYesNoQuestion={true}/>}
        </div>
    );
};

export default CreateRecord;