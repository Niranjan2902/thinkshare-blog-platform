import React from 'react';
import ReactDOM from 'react-dom/client'
import { Provider} from 'react-redux'
import './index.css'
import App from './App.jsx'
import store from './Storage/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout, Login} from './Components/index.js'
import Signup from './Pages/Signup.jsx';
import Post from './Pages/Post.jsx';
import AllPost from './Pages/AllPost.jsx'
import AddPost from './Pages/AddPost.jsx'
import EditPost from './Pages/EditPost.jsx'
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx'

  const router=createBrowserRouter([
    {
      path:'/',
      element:<App/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/about',
          element:<About/>
        },
        {
          path:'/login',
          element:(
            <AuthLayout authentication={false}>
              <Login/>
            </AuthLayout>
          )
        },
        {
          path:'/signup',
          element:(
            <AuthLayout authentication={false}>
              <Signup/>
            </AuthLayout>
          )
        },
        {
          path:'/all-posts',
          element:(
            <AuthLayout authentication>
              {""}
              <AllPost/>
            </AuthLayout>
          )
        },
        {
          path:'/add-post',
          element:(
            <AuthLayout authentication>
              {""}
              <AddPost/>
            </AuthLayout>
          )
        },
        {
          path:'/edit-post/:slug',
          element:(
            <AuthLayout authentication>
              {""}
              <EditPost/>
            </AuthLayout>
          )
        },
        {
          path:'/post/:slug',
          element:<Post/>
        }
      ]
    }
  ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
