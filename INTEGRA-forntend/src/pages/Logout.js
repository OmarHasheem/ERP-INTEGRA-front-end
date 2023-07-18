import { json, redirect, useSubmit } from 'react-router-dom';
import { getAuthToken } from '../hooks/auth';

export async function action() {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('http://localhost:8000/logout', {
      method: 'POST',
      headers: {
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });


    if (!response.ok) {
      throw json({ message: 'Could not logout user.' }, { status: 500 });
    }
  } catch (e) {
      return redirect('/login');
  }
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  localStorage.removeItem('department');

  return redirect('/login');
}

