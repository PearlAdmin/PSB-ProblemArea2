// import './styles.css'

// const Header = ({ header }) => {
//     return (
//         <div>
//             <div className="form-container-shadow pe-2 pb-2">
//                 <div className="form-container-header">
//                     <div className="d-flex align-items-center">
//                         <div className="form-header p-0 mb-0 flex-grow-1 mr-1">
//                             {header}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         );
//     };
// export default Header;

import styles from './styles.module.css';

const Header = ({ id, header, isReadOnly, changeHeader }) => {
    return (
        <div className={`${styles.formContainerShadow} col pt-2`}>
            <div className={`${styles.formContainer}`} style={{borderRadius: '0 0 10px 10px'}}>
                <p className={`${styles.formHeader} ${styles.p}`}>
                    {!isReadOnly && <input className={`${styles.input} ${styles.formAnswer} ${styles.formTransparent} w-100 fw-bold me-4`} id={id} type="text" defaultValue={header} readOnly={isReadOnly} onChange={changeHeader}></input>}
                    {isReadOnly && <div className={`${styles.input} ${styles.formAnswer} ${styles.formTransparent} w-100 fw-bold me-4`} id={id} type="text">{header}</div>}
                </p>
            </div>
        </div>
    );
};
export default Header;