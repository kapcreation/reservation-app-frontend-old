import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import './login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
 
  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true)
    try {
      const data = new FormData(event.currentTarget);

      await login({ username: data.get('username'), password: data.get('password') })

      setLoading(false)
      navigate("/")
    } catch (error) {
      console.error(error)
      setError(error.response.data)

      setLoading(false)
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" id="usernameInput" placeholder='Enter Username' />
        <input type="password" name="password" id="passwordInput" placeholder='Enter password' />
        <button disabled={loading}>Login</button>
        {error && <span>{error}</span>}
      </form>
    </div>
  )
}

export default Login