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