'use server'
import LogIn from "@/components/login/sign-in";
import {cookies} from 'next/headers';

export async function signIn(user) {
  const username = user.username;
  const password = user.password;

  try {
      const response = await fetch('http://localhost:3000/api/login', {
          cache: 'no-store',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: username,
              password: password,
          }),
      });

      if (!response.ok) {
          throw new Error('Invalid credentials');
      }
      const data = await response.json();

      return {
        success: true,
        username: data.user.username,
        role: data.user.role,
      };

  } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
  }
}


export async function setUserCookie(username, role){
    if(!cookies().has('user')){
      cookies().set({
        name: 'user',
        value: JSON.stringify({
          username: username, 
          role: role,
        }),
        path: '/',
      });
    }
    //TODO: what do if cookie exist
;}

const App = () => {
    return (
        <div>
          <LogIn />
        </div>
    );
};

export default App;