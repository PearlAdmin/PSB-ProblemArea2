'use client';
import { useEffect, useState, useRef } from 'react';
import Navbar from "@/components/navigation"
import Question from '@/components/create-record/question';
import Header from '@/components/create-record/header';
import styles from '@/components/create-record/styles.module.css';
import useSWR from 'swr';
import Popup from '@/components/popup';
import Loading from '@/components/loading';

/**
 * Fetcher function for fetching data from the API.
 * 
 * @function
 * @param {String} url - The url to fetch the data from.
 * @return {Object} - The response from the API.
 */
const fetcher = (url) => fetch(url).then((res) => res.json());

/**
 * EditForm page. Displays the edit form page.
 * 
 * @page
 * @return {JSX.Element} The EditForm component.
 */
const EditForm = () => {
    // Variables
    const tempID = useRef(1)
    const {data, isLoading, error} = useSWR('/api/forms', fetcher);
    const formRef = useRef([])
    const [boxes, setBoxes] = useState([]);
    const [isDeleteQuestionVisible, setDeleteQuestionVisible] = useState(false);
    const [isSaveChangesVisible, setSaveChangesVisible] = useState(false);
    const [isSaveSuccessVisible, setSaveSuccessVisible] = useState(false);
    const [toDelete, setDelete] = useState(null);
    
    // Adds a Header to the Form
    const addHeader = (e) => {
        e.preventDefault();
        const newHead = <Header id={tempID.current} header={'Sample Title'} isReadOnly={false} changeHeader={handleChangesQuestion} deletable={true}/>;
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
                                required={false}
                                deletable={true} 
                                dbtype={"text"} 
                                choices={null} 
                                changeQuestion={handleChangesQuestion} 
                                changeType={handleChangesType} 
                                changeChoices={handleChangesChoices} 
                                changeRequired={handleChangesRequired} 
                            />
            setBoxes([...boxes, newQues]);
            formRef.current = [...formRef.current, {_id:newQuesID, question:"Sample Question", inputType:"text", deletable:true, required:false}]
            tempID.current = tempID.current + 1
        }
    }

    // Move positions of Boxes
    //logic for moving boxes up
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
      
    //logic for moving boxes down
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
        setSaveChangesVisible(false);
        setSaveSuccessVisible(false);
        setDeleteQuestionVisible(false);
        setDelete(null);
    }

    // Opens Save Changes Confirmation
    const openSaveChanges = (e) => {
        e.preventDefault();
        setSaveChangesVisible(true);
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
              setSaveSuccessVisible(true);
            } else {
              // Handle errors or non-2xx responses
              console.error('POST request failed: ', response);
              alert("Form edit failed.");
            }
          } catch (error) {
            console.error('An error occurred:', error);
        };
    }

    // Return Home
    const returnHome = (e) => {
        e.preventDefault();
        window.location.href = '/';
    }

    // Put DB data into boxes state and formRef
    useEffect(() =>{
        let updatedBoxes = [];
        if (data) {
            formRef.current = data.questions
            console.log(formRef.current)
            data.questions.map((item, i) => {
                if(item.inputType === 'header'){
                    updatedBoxes = [...updatedBoxes, <Header key={i} id={item._id} header={item.question} deletable={item.deletable}  isReadOnly={false} changeHeader={handleChangesQuestion}/>]
                } else {
                    updatedBoxes = [...updatedBoxes, <Question 
                                                        key={i}
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
        //handle change to question text
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
            question.required = false; //required always false for checkbox

            //logic to put choices when type changed to checkbox or radio
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
    
    if (isLoading) return (<Loading/>);

    if (error) return (<div>{error.message}</div>);

    return (
        <div>
            <Navbar />
            <form className={`${styles.body} container-fluid my-3 px-4 pt-3`}>
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
                <div className={`${styles.actionBtnsContainer} row mt-4`} id="action-btns-container">
                    <button className={`${styles.button} ${styles.actionBtn} col-md-3 mx-auto mb-3 mb-md-none`} id="add-header-btn" onClick={addHeader}>Add Header</button>
                    <button className={`${styles.button} ${styles.actionBtn} col-md-3 mx-auto mb-3 mb-md-none`} id="add-ques-btn" onClick={addQuestion}>Add Question</button>
                    <button className={`${styles.button} ${styles.actionBtn} ${styles.bgBlue} col-md-3 text-white mx-auto mb-3`} onClick={openSaveChanges}>Save Changes</button>
                </div>
            </form>

            {/* Save Changes Confirmation Message */}
            {isSaveChangesVisible && <Popup question={"Are you sure you want to save changes to the form?"} firstBtnLabel={"Yes"} secondBtnLabel={"No"} firstBtnFunc={openSaveSuccess} secondBtnFunc={closeModal} isYesNoQuestion={true}/>}
            {/* Save Changes Successful Message */}
            {isSaveSuccessVisible && <Popup question={"Form successfully edited."} firstBtnLabel={"Return Home"} secondBtnLabel={"Continue"} firstBtnFunc={returnHome} secondBtnFunc={closeModal} isYesNoQuestion={false}/>}            
            {/* Delete Question Confirmation Message */}
            {isDeleteQuestionVisible && <Popup question={`Are you sure you want delete this block? All recorded information will be lost.`} firstBtnLabel={"Yes"} secondBtnLabel={"No"} firstBtnFunc={deleteBox} secondBtnFunc={closeModal} isYesNoQuestion={true}/>}
            
        </div>
    );
};
export default EditForm;