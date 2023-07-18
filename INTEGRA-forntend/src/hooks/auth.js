import { redirect } from 'react-router-dom';

export function getTokenDuration() {
  const storedExpirationDate = +localStorage.getItem('expiration');
  const duration = storedExpirationDate - (new Date()).getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token || token === 'EXPIRED') {
    return redirect('/login');
  }

  return null;
}

export function checkLoginLoader () {
  if (!getAuthToken()) {
    return null;
  }
  return redirect('/marketing');
}
