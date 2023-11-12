import Textbox from '@/components/view-edit-questions/textbox';
import Date from '@/components/view-edit-questions/date';
import MC from '@/components/view-edit-questions/mc';
import Checkbox from '@/components/view-edit-questions/checkbox';
import Header from '@/components/create-record/header';
import styles from '@/components/create-record/styles.module.css';

const CustomView = ({question, answer, options, required, type}) => {
  switch (type){
    case "number":
      return <Textbox question={question} answer={answer} required={required} validation={'[0-9]+'} />
    case "alphanumeric":
      return <Textbox question={question} answer={answer} required={required} validation={'[a-zA-Z0-9]+'} />
    case "text":
      return <Textbox question={question} answer={answer} required={required} />
    //if input a radio choice
    case "radio":
      return <MC question={question} answer={answer} options={options} required={required}/>
    //if input a checkbox choice
    case "checkbox":
        return <Checkbox question={question} answer={answer} options={options} required={required} />
    //if input a date input
    case "date":
        return <Date question={question} answer={answer} required={required} />
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