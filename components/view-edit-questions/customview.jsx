import Textbox from '@/components/view-edit-questions/textbox';
import Dates from '@/components/view-edit-questions/date';
import MC from '@/components/view-edit-questions/mc';
import Checkbox from '@/components/view-edit-questions/checkbox';
import Header from '@/components/create-record/header';

const CustomView = ({id, question, answer, options, required, type, order, didEdit}) => {
  switch (type){
    case "number":
      return <Textbox id={id} question={question} answer={answer} required={required} type={type} validation={'[0-9]+'} order={order} didEdit={didEdit}/>
    case "alphanumeric":
      return <Textbox id={id} question={question} answer={answer} required={required} type={type} validation={'[a-zA-Z0-9]+'} order={order} didEdit={didEdit}/>
    case "text":
      return <Textbox id={id} question={question} answer={answer} required={required} type={type} order={order} didEdit={didEdit} />
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