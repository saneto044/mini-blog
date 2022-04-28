import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthtication'

import styles from './Login.module.css'

export const Login = () => {
  
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [error,setError] = useState()

  const {createUser , error:authError, loading} = useAuthentication();
  
  const handleSubmit = async (e) => {

    setError('');

    const user = {
      email,
      password,
    };
    const res = await createUser(user)
    console.log(res)
  };

  useEffect(() => {
    
  })

  return (
    <div className={styles.login}>
        <h1>Entrar</h1>
        <p>Faça seu login para usar o sistema</p>
        <form onSubmit={handleSubmit}>
          <label >
            <span>E-mail:</span>
            <input 
            type="email" 
            name="email"
            required
            placeholder='E-mail do usuario'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Password</span>
            <input 
            type="password" 
            name='password'
            required
            placeholder='Digite sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {!loading && <button className='btn'>Entrar</button>}
          {loading && (
            <button className="btn" disabled >Aguarde</button>
          )}
          {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}
