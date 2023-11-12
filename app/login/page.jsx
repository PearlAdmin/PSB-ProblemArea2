import LogIn from "@/components/login/sign-in";

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

const App = () => {
    return (
        <div>
          <LogIn />
        </div>
    );
};

export default App;