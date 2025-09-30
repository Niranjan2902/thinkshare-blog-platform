import { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login,logout} from './Storage/authSlice'
import {Header,Footer} from './Components'
import {Outlet} from 'react-router-dom'

function App() {
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
    authService.getCurrentUser().then(
      (userData)=>{
        if(userData){
          dispatch(login(userData))//if problem occurs add it as({UserData})
        } else{
          dispatch(logout())                                                                              
        }
      })
    .finally(()=>setLoading(false))
  },[])

  return !loading?(
  <>
    <div className="min-h-screen flex flex-wrap content-between bg-gray-50">
      <div className="w-full block">
            <Header/>
              <main>
                <Outlet/>
              </main>
            <Footer/>
      </div>
    </div>
    
  </>
  ):(null)
}

export default App
