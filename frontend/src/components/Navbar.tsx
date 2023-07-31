import { Link } from 'react-router-dom'
import Styles from './Navbar.module.css'

const Navbar = () => {

  return (
    <div className={Styles.container}>
      <Link to={'/'} style={{color: 'rgba(0, 0, 0, 0.8)'}}>
        <span>Home</span>
      </Link>
      <Link to={'/calendar'} style={{color: 'black'}}>
        <span>Calendar</span>
      </Link>
      <Link to={'/profile'} style={{color: 'black'}}>
        <span>Profile</span>
      </Link>
      <Link to={'/signIn'} style={{color: 'black'}}>
        <span>Sign In</span>
      </Link>
    </div>
  )
}

export default Navbar