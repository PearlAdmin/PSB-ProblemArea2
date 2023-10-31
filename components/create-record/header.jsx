import './styles.css'

const Header = ({ header }) => {
    return (
        <div>
            <div className="form-container-shadow pe-2 pb-2">
                <div className="form-container-header">
                    <div className="d-flex align-items-center">
                        <div className="form-header p-0 mb-0 flex-grow-1 mr-1">
                            {header}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    };
export default Header;