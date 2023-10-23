import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const toggleMenu = () => {
        // Add your toggleMenu logic here
    };

    return (
        <nav className="navbar navbar-light bg-light sticky-top" id="navbar">
        <div className="nav-container container-fluid h-100">
            <div className="nav-left row h-100">
            <div className="col-md-auto h-100">
                <Link className="navbar-brand h-100 w-auto d-flex align-items-center" href="/">
                <Image
                    className="d-inline-block me-1 "
                    id="navbar-logo-img"
                    draggable={false}
                    src="/logo.png"
                    alt=""
                    height={50}
                    width={50}
                />
                <Image
                    className="h-75 d-none d-md-inline-block"
                    id="navbar-name-img"
                    draggable={false}
                    src="/name.png"
                    alt=""
                    height={75}
                    width={350}
                />
                </Link>
            </div>
            </div>
            <div className="nav-right col-md text-end d-flex align-items-center h-100">
            <button className="navbar-menu-btn navbar-toggler-icon ms-auto pe-3" id="navbar-menu-btn" onClick={toggleMenu}></button>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;