import Textbox from './textbox';
import MC from './mc';
import Checkbox from './checkbox';
import Dates from './date';
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
    case "number":
      return <Textbox question={props.config.question} type={props.config.inputType} required={props.config.required} setValues={props.setValues} validation={'[0-9]+'}/>
    case "alphanumeric":
      return <Textbox question={props.config.question} type={props.config.inputType} required={props.config.required} setValues={props.setValues} validation={'[a-zA-Z0-9]+'}/>
    case "text":
      return <Textbox question={props.config.question} type={props.config.inputType} required={props.config.required} setValues={props.setValues}/>
    //if input a radio choice
    case "radio":
      return <MC type={"radio"} question={props.config.question} options={props.config.choices} required={props.config.required} setValues={props.setValues}/>
    //if input a checkbox choice
    case "checkbox":
        return <MC type={"checkbox"} question={props.config.question} options={props.config.choices} required={props.config.required} setValues={props.setValues}  />
    //if input a date input
    case "date":
        return <Dates question={props.config.question} type={props.config.inputType} required={props.config.required} setValues={props.setValues}/>
  }
};
export default CustomInput;