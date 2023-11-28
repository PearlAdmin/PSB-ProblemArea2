import Textbox from '@/components/view-edit-questions/textbox';
import Dates from '@/components/view-edit-questions/date';
import MC from '@/components/view-edit-questions/mc';
import Checkbox from '@/components/view-edit-questions/checkbox';
import Header from '@/components/create-record/header';

/**
 * CustomView component for rendering different question types in a view/edit form.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The unique identifier for the question.
 * @param {string} props.question - The question text.
 * @param {string|string[]} props.answer - The answer to the question.
 * @param {string[]} props.options - The available options for the question (for multiple-choice questions).
 * @param {boolean} props.required - Indicates whether the question is required.
 * @param {string} props.type - The type of the question.
 * @param {number} props.order - The order of the question in the form.
 * @param {Function} props.didEdit - Callback function indicating whether the question was edited.
 * @returns {React.Element} - The CustomView component JSX.
 */
const CustomView = ({id, question, answer, options, required, type, order, didEdit}) => {
  switch (type){
    //if input a number input
    case "number":
      return <Textbox id={id} question={question} answer={answer} required={required} type={type} validation={'^[0-9]+(?:.[0-9]+)?$'} order={order} didEdit={didEdit}/>
    //if input an alphanumeric input
    case "alphanumeric":
      return <Textbox id={id} question={question} answer={answer} required={required} type={type} validation={'[a-zA-Z0-9]+'} order={order} didEdit={didEdit}/>
    //if input a text input
    case "text":
      //DO NOT DELETE THE SPACE AFTER THE 9 IN THE VALIDATION
      return <Textbox id={id} question={question} answer={answer} required={required} type={type} validation={"[a-zA-Z0-9 ,.!'@]+"} order={order} didEdit={didEdit} />
    //if input a radio choice
    case "radio":
      return <MC id={id} question={question} answer={answer} options={options} required={required} order={order} didEdit={didEdit}/>
    //if input a checkbox choice
    case "checkbox":
        return <Checkbox id={id} question={question} answer={answer} options={options} required={required} order={order} didEdit={didEdit} />
    //if input a date input
    case "date":
        return <Dates id={id} question={question} answer={answer} required={required} order={order} didEdit={didEdit} />
    case "header":
      return (
        <>
          <Header header={question} isReadOnly={true} />
          <div className="mb-3"></div>
        </>
      )
  }
};
export default CustomView;