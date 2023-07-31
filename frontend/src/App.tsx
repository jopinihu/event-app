// import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router'

function App() {

  // Create so this is global at some point, and pass this to Login component

  // const [user, setUser] = useState<any>(false)

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user")
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser)
  //     setUser(foundUser)
  //   }
  // }, [])

  return (
    <>

      <Navbar />
      <Outlet />
      


    </>
  );
}

export default App;
