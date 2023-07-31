import styles from './SignIn.module.css'

import LogIn from '../components/Login'
function SignIn() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign in</h1>
      <LogIn />
    </div>
  )
}

export default SignIn
