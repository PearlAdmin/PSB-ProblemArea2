import styles from './styles.module.css';

/**
 * Header component for rendering a section header.
 * @component
 * @param {Object} props - The properties of the Header component.
 * TODO: check if this is correct
 * @param {string} props.id - The unique identifier for the header.
 * @param {string} props.header - The text content of the header.
 * @param {boolean} props.isReadOnly - Indicates whether the header is in read-only mode.
 * @param {Function} props.changeHeader - A function to handle changes to the header.
 * @returns {JSX.Element} JSX.Element representing the Header component.
 */
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