import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../Storage/authSlice';

function LogoutBtn() {
    const dispatch=useDispatch()
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
    return(
        <button className='inline-block px-6 py-2 duration-200hover:bg-indigo-600 rounded-full text-lg font-semibold text-[#f8f9fa] hover:text-[#ffffffcc]'
        onClick={logoutHandler} 
        >Logout</button>
    )
}

export default LogoutBtn;