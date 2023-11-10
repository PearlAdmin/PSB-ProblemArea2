"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './nav.styles.css'
import { useRouter } from 'next/navigation';

const Navbar = (cookieResult) => {
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();

    useEffect( () => {
        console.log(cookieResult.cookie);
        if(!cookieResult.cookie){
            router.push('/login');
        } 
    })
    
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    
    return (
        <div style={{ marginBottom: '75px' }}>
            <nav className="navbar navbar-light bg-light fixed-top" id="navbar">
                <div className="container-fluid">
                <div className="navbar-left">
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

                <div className="navbar-right text-end d-flex align-items-center ms-auto">
                    <div className="nav-right col-md text-end d-flex align-items-center h-100">
                    <button className="navbar-menu-btn navbar-toggler-icon" id="navbar-menu-btn" onClick={toggleMenu}></button>
                    </div>

                    <div className={`navbar-menu-container bg-light end-0 flex-column ${showMenu ? 'show-menu' : ''}`} id="navbar-menu">
                    <ul className="list-unstyled p-3">
                        <li className="navbar-menu-option">Create Record</li>
                        <li className="navbar-menu-option">View Records</li>
                        <li className="navbar-menu-option">View Form</li>
                        <li className="navbar-menu-option">Edit Form</li>
                        <li className="navbar-menu-option">Edit Access</li>
                        <li className="navbar-menu-option">Trash</li>
                        <li className="navbar-menu-option red-text mb-auto">Log Out</li>
                    </ul>
                    </div>
                </div>
                </div>
            </nav>
            </div>
        );
};

export default Navbar;
