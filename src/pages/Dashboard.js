import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Dashboard() {
    const { user } = useContext(UserContext);


    return (user ? <Outlet/> : <Navigate to='/login'/>);
}

export default Dashboard;
