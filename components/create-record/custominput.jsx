import Textbox from './textbox';
import MC from './mc';
import Checkbox from './checkbox';
import Dates from './date';

/**
 * CustomInput component for rendering different question types in a create record page.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 *                          May contain the following:
 *                            config - contains the data saved in the db (question, inputType, required, choices), 
 *                            setValues - function that handles onChange of input field of that question
 * @returns {React.Element} - The CustomInput component JSX.
 */
const CustomInput = (props) => {
  switch (props.config.inputType){
    //if input a number input
    case "number":
      return <Textbox question={props.config.question} type={props.config.inputType} required={props.config.required} setValues={props.setValues} validation={'^([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$'}/>
    //if input an alphanumeric input
    case "alphanumeric":
      return <Textbox question={props.config.question} type={props.config.inputType} required={props.config.required} setValues={props.setValues} validation={'[a-zA-Z0-9]+'}/>
    //if input a text input
    case "text":
      //DO NOT DELETE THE SPACE AFTER THE 9 IN THE VALIDATION
      return <Textbox question={props.config.question} type={props.config.inputType} required={props.config.required} setValues={props.setValues} validation={"[a-zA-Z0-9 Ññ_,.!'@\\-]+"}/>   
    //if input a radio choice
    case "radio":
      return <MC type={"radio"} question={props.config.question} options={props.config.choices} required={props.config.required} setValues={props.setValues}/>
    //if input a checkbox choice
    case "checkbox":
        return <Checkbox type={"checkbox"} question={props.config.question} options={props.config.choices} required={props.config.required} setValues={props.setValues} />
    //if input a date input
    case "date":
        return <Dates question={props.config.question} type={props.config.inputType} required={props.config.required} setValues={props.setValues}/>
  }
};
export default CustomInput;