'use server'
import LogIn from "@/components/login/sign-in";
import {cookies} from 'next/headers';

export async function signIn(user) {
  const username = user.username;
  const password = user.password;

  try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+'/api/login', {
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
;}

export async function handleCookie(){
  if(!cookies().has('user')){
    return false;
  } else{
    //TODO: check if user.username exists in DB
    //returns true if user.username is still a valid user
    return true;
  }
}

const App = () => {
    return (
        <div>
          <LogIn />
        </div>
    );
};

export default App;