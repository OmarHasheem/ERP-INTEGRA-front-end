import { Form, json, redirect } from 'react-router-dom';
import classes from './Login.module.scss';
import { getTokenDuration } from '../hooks/auth';

const LoginPage = () => {
  return (
    <div className={classes.login}>
      <h2 className={classes.integra}>I N T E G R A</h2>
      <div className={classes.loginForm}>
        <Form method='post' className={classes.form}>
          <div>
            <h1 className={classes.h1}>Login</h1>
          </div>
          <input
            type='text'
            name='email'
            className='input'
            placeholder='Email'
          />
          <input
            type='password'
            name='password'
            className='input'
            placeholder='Password'
          />
          <button className={classes.button}>Login</button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;

export async function action({ request }) {
  const data = await request.formData();

  const loginData = {
    email: data.get('email'),
    password: data.get('password')
  };

  const response = await fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  });

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.authorisation.token;

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 579);
  localStorage.setItem('expiration', expiration.getTime().toString());
  localStorage.setItem('department', resData.permission);
  return redirect(`/${resData.permission}`);
}
