import { NextPage } from "next";
import { useState } from "react";
import Head from 'next/head';
import Image from 'next/image';
import {signIn} from 'next-auth/react';

const SignIn: NextPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = credentials.username;
    const password = credentials.password;

    try {
      await signIn('credentials', {
        username, 
        password,
        callbackUrl: '/'
      });
    } catch (error) {
      console.log(error);
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: `        
          .container{
              max-width: 600px;
              padding: 5%;
          }

          .container .title {
              text-align: center;
              margin-bottom: 5px;
          }

          #showPasswordButton {
              position: absolute;
              right: 10px;
              background-color: transparent;
              border: none;
              z-index: 5;
          }
        `}} />
      </Head>
    
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="container">
          <div className="title">
            <div className="title">
                <Image src="/logo.png" alt="Pearl S Buck Logo" width={150} height={150} /> 
                <Image src="/name.png" alt="Pearl S Buck Name" width={350} height={50} />
            </div>

            {/* LOGIN FORM */}
            <form onSubmit={onLogin}>
              <div className="user-details">
                <div className="input-group mb-3">
                  <input type="text" 
                  id="username" 
                  className="form-control" 
                  placeholder="Username" 
                  required 
                  onChange={event => setCredentials({ ...credentials, username: event.target.value})}/>
                </div>

                <div className="input-group mb-3">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    onChange={event => setCredentials({ ...credentials, password: event.target.value })}
                  />
                  <button
                    type="button"
                    className="btn btn-light"
                    id="showPasswordButton"
                    onClick={togglePasswordVisibility}
                  >
                    <i className={`bi ${passwordVisible ? 'bi-eye' : 'bi-eye-slash'}`} id="togglePassword"></i>
                  </button>
                </div>
              </div>

              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Remember Me
                </label>
              </div>

              <div className="submit-button" style={{ marginTop: '10px' }}>
                <input type="submit" className="form-control btn btn-primary" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn;