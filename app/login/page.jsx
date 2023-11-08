import LogIn from "@/components/login/sign-in";
import Home from "../page";
import { useRouter } from 'next/navigation';

const App = () => {
    function handleLogin(user) {
      setCookie("user", user, { path: "/" });
    }


    return (
        <div>
           <LogIn />
        </div>
    );
};

export default App;