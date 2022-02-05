import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Loading } from './Loading';
import { useHistory } from 'react-router-dom';

export const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, isLoading } = useUser();

  // login Function
  const login = (e) => {
    e.preventDefault();
    const user = { email, password };
    loginUser(user, history);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='container'>
          <div className='d-grid  align-content-center min-vh-100 justify-content-center'>
            <form onSubmit={login}>
              <div className='card p-5 shadow border-5 bg-gradient'>
                <i className='fas fa-user text-center fa-3x '></i>
                <h3 className='text-center fw-bold fs-1 mb-5'>Login</h3>
                <div className='mb-3'>
                  <label htmlFor='username' className='form-label'>
                    Username / Email
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='username'
                    placeholder='email@email.com'
                    autoFocus
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label'>
                    Password
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    placeholder='******'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <button className='btn btn-primary boton ' type='submit'>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
