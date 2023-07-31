import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css'

export interface User {
  user_id?: number
  name?: string
  username?: string
  password?: string
  email?: string
}

function LogIn() {
  const initialState: User = {
    username: "",
    password: ""
  }
  const [state, setState] = useState<User>(initialState)
  const [token, setToken] = useState<string>('')

  const navigate = useNavigate()


  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(state),
      })
        .then((res) => res.text())
        .then((jwtToken) => setToken(jwtToken))

      setState(initialState)
    } catch (error) {
      console.log(error)
      alert("Dobby is a bad house elf")
      return
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    let tokenExist = false
    if (tokenExist == false) {
      localStorage.setItem('accessToken', token)
      tokenExist = true
      const accessToken = localStorage.getItem('accessToken')

      if (accessToken) {
        navigate('/profile')
      }
    }
  }, [token])

  return (
    <div>
      <form 
        onSubmit={handleSubmit} 
        className={styles.form}
      >
        <div className={styles.input}>
          <input
            type="text"
            placeholder='Username'
            value={state.username}
            name="username"
            onChange={handleInputChange} />
          <input
            type="password"
            placeholder='Password'
            value={state.password}
            name="password"
            onChange={handleInputChange} />
        </div>
        <button 
          type="submit" 
          className={styles.btn}
        >
          Login
        </button>
        <Link 
          to={'/register'} 
          className={styles.btn}
        >
          Register
        </Link>
      </form>
    </div>
  )
}

export default LogIn
