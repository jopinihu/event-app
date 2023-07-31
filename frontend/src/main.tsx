import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Calendar from './pages/Calendar'
import SignIn from './pages/SignIn'
import App from './App'
import Home from './pages/Home'
import Profile from './pages/Profile'
import EventById from './Events/EventByID'
import Register from './pages/Register'
import EventForm from './pages/EventForm'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/signIn',
        element: <SignIn />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/calendar',
        element: <Calendar />
      },
     {
      path: '/events/:id',
      element:  <EventById/>
     },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/eventForm',
        element: <EventForm/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
