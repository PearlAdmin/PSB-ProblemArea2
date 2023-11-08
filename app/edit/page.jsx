'use client';

import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Navbar from "@/components/navigation"
import Question from '@/components/create-record/question';
import Header from '@/components/create-record/header';
import { Button } from 'react-bootstrap';
import styles from '@/components/create-record/styles.module.css';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

function getQuestion() {
    const { data, isLoading, error } = useSWR('/api/forms', fetcher);
    
    return {data, isLoading, error};
}

const EditForm = () => {
    // Variables
    const tempID = useRef(1)
    const {data, isLoading, error} = getQuestion()
    const formRef = useRef([])
    const [boxes, setBoxes] = useState([]);
    const [isDeleteQuestionVisible, setDeleteQuestionVisible] = useState(false);
    const [isSaveChangesVisible, setSaveChangesVisible] = useState(false);
    const [isSaveSuccessVisible, setSaveSuccessVisible] = useState(false);
    const [toDelete, setDelete] = useState(null);
    
    // Adds a Header to the Form
    const addHeader = (e) => {
        e.preventDefault();
        const newHead = <Header id={tempID.current} header={'Sample Title'} isReadOnly={false} changeHeader={handleChangesQuestion}/>;
        setBoxes([...boxes, newHead]);
        formRef.current = [...formRef.current, { _id:tempID.current, question:'Sample Title', inputType:'header', deletable: true, required:false }]
        tempID.current = tempID.current + 1
    }

    // Adds a Question to the Form
    const addQuestion = (e) => {
        e.preventDefault();
        const newQuesID = tempID.current;
        if(newQuesID) {
            const newQues = <Question 
                                id={newQuesID} 
                                question={`Sample Question`} 
                                required={true}
                                deletable={true}
                                dbtype={"text"} 
                                choices={null} 
                                changeQuestion={handleChangesQuestion} 
                                changeType={handleChangesType} 
                                changeChoices={handleChangesChoices} 
                                changeRequired={handleChangesRequired} 
                            />
            setBoxes([...boxes, newQues]);

            formRef.current = [...formRef.current, {_id:newQuesID, question:"Sample Question", inputType:"text", deletable:true, required:true}]
            tempID.current = tempID.current + 1
        }
    }

    // Move positions of Boxes
    const moveUp = (id) => {
        const currentIndex = boxes.findIndex((box) => box.props.id === id);
        if (currentIndex > 0) {
            const updatedBoxes = [...boxes];
            const updatedForm = formRef.current
            const temp = updatedBoxes[currentIndex];
            const tempForm = updatedForm[currentIndex]

            updatedBoxes[currentIndex] = updatedBoxes[currentIndex - 1];
            updatedBoxes[currentIndex - 1] = temp;
            updatedForm[currentIndex] = updatedForm[currentIndex - 1];
            updatedForm[currentIndex - 1] = tempForm;

            setBoxes(updatedBoxes);
            formRef.current = updatedForm
        }
    };
      
    const moveDown = (id) => {
        const currentIndex = boxes.findIndex((box) => box.props.id === id);
        if (currentIndex < boxes.length - 1) {
            const updatedBoxes = [...boxes];
            const updatedForm = formRef.current
            const temp = updatedBoxes[currentIndex];
            const tempForm = updatedForm[currentIndex]

            updatedBoxes[currentIndex] = updatedBoxes[currentIndex + 1];
            updatedBoxes[currentIndex + 1] = temp;
            updatedForm[currentIndex] = updatedForm[currentIndex + 1];
            updatedForm[currentIndex + 1] = tempForm;

            setBoxes(updatedBoxes);
            formRef.current = updatedForm
        }
    };      

    // Opens Delete Confirmation
    const openDelete = (id) => {
        setDeleteQuestionVisible(true);
        setDelete(id);
    }

    // Delete Box
    const deleteBox = (e) => {
        const updatedBoxes = boxes.filter((box) => box.props.id !== toDelete);
        setBoxes(updatedBoxes);

        formRef.current = formRef.current.filter((item) => item._id !== toDelete)

        setDeleteQuestionVisible(false);
    }

    // Close Popup
    const closeModal = (e) => {
        e.preventDefault();
        // setInputQuestionIDVisible(false);
        setSaveChangesVisible(false);
        setSaveSuccessVisible(false);
        setDeleteQuestionVisible(false);
        setDelete(null);
    }

    // Opens Save Changes Confirmation
    const openSaveChanges = (e) => {
        e.preventDefault();
        setSaveChangesVisible(true);
        console.log("form: ", formRef.current)
    }

    // Opens Save Changes Success
    const openSaveSuccess = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/forms', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formRef.current),
            });
      
            if (response.ok) {
              // Handle the successful response here
              console.log('POST request was successful');
            } else {
              // Handle errors or non-2xx responses
              console.error('POST request failed: ', response);
            }
          } catch (error) {
            console.error('An error occurred:', error);
        };

        setSaveSuccessVisible(true);
    }

    // Return Home
    const returnHome = (e) => {
        e.preventDefault();
        window.location.href = '/';
    }

    // Put DB data into boxes state and formRef
    useEffect(() =>{
        let updatedBoxes = boxes
        if (data) {
            formRef.current = data.questions
            console.log(formRef.current)
            data.questions.map((item, i) => {
                if(item.inputType === 'header'){
                    updatedBoxes = [...updatedBoxes, <Header id={item._id} header={item.question} deletable={item.deletable}  isReadOnly={false} changeHeader={handleChangesQuestion}/>]
                } else {
                    updatedBoxes = [...updatedBoxes, <Question 
                                                        id={item._id} 
                                                        question={item.question} 
                                                        required={item.required}
                                                        deletable={item.deletable} 
                                                        dbtype={item.inputType} 
                                                        choices={item.choices} 
                                                        changeQuestion={handleChangesQuestion} 
                                                        changeType={handleChangesType} 
                                                        changeChoices={handleChangesChoices} 
                                                        changeRequired={handleChangesRequired} 
                                                    />]
                }
            })
            setBoxes(updatedBoxes)
        }
    }, [data])

    // Handlers for edits made in the form
    const handleChangesQuestion = (e) => {
        //handle change to question and required
        const newForm = formRef.current;

        const questionIndex = newForm.findIndex((element) => element._id == e.target.id)
        const question = newForm[questionIndex]
        
        question.question = e.target.value

        newForm[questionIndex] = question;

        formRef.current = newForm
        console.log("formRef.current: ",formRef.current)
    }

    const handleChangesType = (choices, e) => {
        //handle change to type
        const newForm = formRef.current;

        const questionIndex = newForm.findIndex((element) => element._id == e.target.id)
        const question = newForm[questionIndex]
        
        question.inputType = e.target.value
        if(question.inputType === "checkbox" || question.inputType === "radio"){
            //add choices property (incomplete logic)
            if(choices){
                question.choices = choices
            } else {
                question.choices = []
            }
        } else {
            delete question.choices
        }

        newForm[questionIndex] = question;

        formRef.current = newForm
        console.log("formRef.current: ",formRef.current)
    }

    const handleChangesRequired = (e) => {
        //handle change to required
        const newForm = formRef.current;

        const questionIndex = newForm.findIndex((element) => element._id == e.target.id)
        const question = newForm[questionIndex]
        
        question.required = e.target.checked

        newForm[questionIndex] = question;

        formRef.current = newForm
        console.log("formRef.current: ",formRef.current)
    }

    const handleChangesChoices = (options, dbid) => {
        //handle change to choices
        const newForm = formRef.current;

        const questionIndex = newForm.findIndex((element) => element._id == dbid)
        const question = newForm[questionIndex]

        question.choices = options

        newForm[questionIndex] = question;

        formRef.current = newForm
        console.log("formRef.current: ",formRef.current)
    }
    
    if (isLoading) return (<div>Loading...</div>);
    if (error) return (<div>{error.message}</div>);

    return (
        <div>
            <Navbar />
            <form className={`${styles.body} container-fluid my-3 px-5 pt-3`}>
                {/* Array generating the headers/questions */}
                {boxes.map((box) =>
                    <div key={box.props.id} className={"row mb-3"}>
                        {box}
                        <div className={`${styles.formContainerMoverContainer}`}>
                            <i className={`${styles.bi} bi-arrow-up`} onClick={() => moveUp(box.props.id)}></i>
                            {(box.props.deletable && 
                                <i className={`${styles.editBlockBtn} ${styles.bi} bi-trash my-auto pe-2`} onClick={() => openDelete(box.props.id)}></i>
                            )}
                            <i className={`${styles.bi} bi-arrow-down`} onClick={() => moveDown(box.props.id)}></i>
                        </div>
                    </div>
                )}

            
                {/* Buttons to Add Headers, Questions, etc. */}
                <div className={`${styles.actionBtnsContainer} row my-3`} id="action-btns-container">
                    <button className={`${styles.button} ${styles.actionBtn} mx-auto`} id="add-header-btn" onClick={addHeader}>Add Header</button>
                    <button className={`${styles.button} ${styles.actionBtn} mx-auto`} id="add-ques-btn" onClick={addQuestion}>Add Question</button>
                    <button className={`${styles.button} ${styles.actionBtn} ${styles.bgBlue} text-white mx-auto`} onClick={openSaveChanges}>Save Changes</button>
                </div>
            </form>

            {/* Save Changes Confirmation Message */}
            {isSaveChangesVisible && (
                <div className={`${styles.popupModal}`} id="form-confirm-container">
                    <div className={`${styles.popupModalBoxContainer}`}>
                        <div className={`${styles.popupModalBoxShadow} pe-2 pb-2`}>
                            <div className={`${styles.popupModalBox}`}>
                                <div className={`${styles.popupModalBoxTop} text-start pt-4 ps-4`}>Are you sure you want to save changes to the form?</div>
                                <div className={`popup=modal-box-low text-start py-4 ps-4`}>
                                    <button className={`${styles.button} ${styles.confirmBtn} ${styles.yesBtn}`} onClick={openSaveSuccess}>Yes</button>
                                    <button className={`${styles.button} ${styles.confirmBtn} ${styles.noBtn}`} id="confirm-no-btn" onClick={closeModal}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Save Changes Successful Message */}
            {isSaveSuccessVisible && (
                <div className={`${styles.popupModal}`} id="form-success-container">
                    <div className={`${styles.popupModalBoxContainer}`}>
                        <div className={`${styles.popupModalBoxShadow} pe-2 pb-2`}>
                            <div className={`${styles.popupModalBox}`}>
                                <div className={`${styles.popupModalBoxTop} text-start pt-4 ps-4`}>Form successfully edited.</div>
                                <div className={`popup=modal-box-low text-start py-4 ps-4`}>
                                    <button className={`${styles.button} ${styles.confirmBtn} w-auto px-3 me-1`} onClick={returnHome}>Return Home</button>
                                    <button className={`${styles.button} ${styles.confirmBtn} w-auto px-3`} onClick={closeModal}>Continue Editing</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Delete Question Confirmation Message */}
            {isDeleteQuestionVisible && (
                <div className={`${styles.popupModal}`} id="delete-question-container">
                    <div className={`${styles.popupModalBoxContainer}`}>
                        <div className={`${styles.popupModalBoxShadow} pe-2 pb-2`}>
                            <div className={`${styles.popupModalBox}`}>
                                <div className={`${styles.popupModalBoxTop} text-start pt-4 ps-4`}>Are you sure you want delete this block?<br></br>All recorded information will be lost.</div>
                                <div className={`popup=modal-box-low text-start py-4 ps-4`}>
                                    <button className={`${styles.button} ${styles.confirmBtn} ${styles.yesBtn}`} onClick={deleteBox}>Yes</button>
                                    <button className={`${styles.button} ${styles.confirmBtn} ${styles.noBtn}`} id="delete-ques-no-btn" onClick={closeModal}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
};
export default EditForm;