"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './nav.styles.css';
import { useRouter } from 'next/navigation';
import { Cookies } from 'react-cookie';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const router = useRouter();
    const cookies = new Cookies();

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
                        <li
                            className="navbar-menu-option"
                            onClick={() => router.push('/create')}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                router.push('/create');
                                }
                            }}
                            tabIndex="0"
                            style={{ cursor: 'pointer' }}
                        >
                            Create Record
                        </li>
                        <li 
                            className="navbar-menu-option"
                            onClick={() => router.push('/')}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                router.push('/');
                                }
                            }}
                            tabIndex="0"
                            style={{ cursor: 'pointer' }}
                            >
                                View Records
                            </li>
                        <li 
                            className="navbar-menu-option"
                            onClick={() => router.push('/edit')}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                router.push('/');
                                }
                            }}
                            tabIndex="0"
                            style={{ cursor: 'pointer' }}
                            >
                                Edit Form
                            </li>
                        <li 
                            className="navbar-menu-option"
                            onClick={() => router.push('/')}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                router.push('/');
                                }
                            }}
                            tabIndex="0"
                            style={{ cursor: 'pointer' }}
                            >
                                Edit Access
                            </li>
                        <li 
                            className="navbar-menu-option"
                            onClick={() => router.push('/')}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                router.push('/');
                                }
                            }}
                            tabIndex="0"
                            style={{ cursor: 'pointer' }}
                            >
                                Deleted Records
                            </li>
                        {/* TODO: render dropdown for manage-user if cookie.role == admin*/}
                        {/* <li className="navbar-menu-option"
                            onClick={() => {
                                router.push('/manage-user');
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    router.push('/manage-user');
                                }
                            }}
                            tabIndex="0"
                            style={{ cursor: 'pointer' }}
                        
                        >
                            {cookies.get('user') && cookies.get('user').role === 'admin' && (
                                <div className="manage-user-dropdown">
                                    Manage Users
                                </div>
                            )}
                        </li> */}

                        <li 
                            className="navbar-menu-option red-text mb-auto"
                            onClick={() => {
                                cookies.remove('user');
                                router.push('/login');
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    cookies.remove('user');
                                    router.push('/login');
                                }
                            }}
                            tabIndex="0"
                            style={{ cursor: 'pointer' }}
                            >
                            Log Out
                        </li>
                        
                    </ul>
                    </div>
                </div>
                </div>
            </nav>
            </div>
        );
};

export default Navbar;
