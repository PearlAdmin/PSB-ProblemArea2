import Textbox from './textbox';
import MC from './mc';
import Checkbox from './checkbox';
import Date from './date';
/*
props will have:
  props.config - an object that contains the ones included in 
    Questions schema (question, inputType, deletable, required, choices)
  props.setValues - to pass input data to create.jsx page (only needed for creating record)
  props.values - to pass data from parent page to component (only needed in view record / edit record)
    **concept for props.values still wip***
*/
const CustomInput = (props) => {
  switch (props.config.inputType){
    //if input a text input
    case "text":
    case "number":
      return <Textbox question={props.config.question} required={props.config.required} setValues={props.setValues} />
    //if input a radio choice
    case "radio":
      return <MC type={"radio"} question={props.config.question} options={props.config.choices} required={props.config.required} setValues={props.setValues}/>
    //if input a checkbox choice
    case "checkbox":
        return <MC type={"checkbox"} question={props.config.question} options={props.config.choices} required={props.config.required} setValues={props.setValues} />
    //if input a date input
    case "date":
        return <Date question={props.config.question} required={props.config.required} setValues={props.setValues} />
  }
  // i dunno how we would do file ;-;
    };
export default CustomInput;