import Navbar from "@/components/navigation";
import UserList from "@/components/manage-user/view-user-list";
import Register from "@/components/manage-user/register-user";
import './styles.css';

const ManageUser = async () => {
    return (
        <div>
            <Navbar />
            <div className="d-flex justify-content-center text-align-center">
                <div className="col p-3" style={{ backgroundColor: '#C5E2EA', margin: '10px', borderRadius: '10px' }}>
                    <UserList/>
                </div>
                <div className="col p-3" style={{ backgroundColor: '#C5E2EA', margin: '10px', borderRadius: '10px' }}>
                    <Register />
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
