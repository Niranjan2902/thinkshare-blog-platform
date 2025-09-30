import React from 'react'
import { Container,LogoutBtn,Logo } from "../index";
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';
function Header() {
    const navigate=useNavigate()
    const authStatus=useSelector((state)=>state.auth.status)

    const navItems=[
        {
            name:'Home',
            slug:'/',
            active:true
        },
        {
            name: "About",
            slug: "/about",
            active:!authStatus,
        },
        {
            name:'Login',
            slug:'/login',
            active:!authStatus
        },
        {
            name:'Signup',
            slug:'/signup',
            active:!authStatus
        },
        {
            name:'All Posts',
            slug:'/all-posts',
            active:authStatus
        },
        {
            name:'Add Post',
            slug:'/add-post',
            active:authStatus
        },
    ]
    return(
        <header className='py-3 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600'>
            <Container>
                <nav className='flex'>
                    <div className="mr-4">
                        <Link to='/'>
                        <Logo width='70px'/>
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item)=>item.active? (
                            <li key={item.name}>
                                <button
                                className='inline-bock px-6 py-2 duration-300 hover:scale-105
                                hover:bg-indigo-600 rounded-full text-lg font-semibold text-[#f8f9fa] hover:text-pink-200'
                                onClick={()=>navigate(item.slug)}>
                                    {item.name}
                                </button>
                            </li>
                        ):null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn className='text-white bg-pink-400 rounded-full hover:bg-pink-300 transition-all duration-300'/> {/*Class added*/}
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header;