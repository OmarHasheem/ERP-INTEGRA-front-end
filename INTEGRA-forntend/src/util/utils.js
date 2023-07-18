import { redirect } from 'react-router-dom';
import { checkAuthLoader, getAuthToken } from '../hooks/auth';

export function marketingLoader() {
  const token = getAuthToken();
  if(!token)
    return redirect('/login');

  const department = localStorage.getItem('department');

  if (department == "marketing" || department == "userManagement") {
    return null;
  }

  return redirect(`/${department}`);
}

export function hrLoader() {
  const token = getAuthToken();
  if(!token)
    return redirect('/login');

  const department = localStorage.getItem('department');

  if (department == "hr" || department == "userManagement") {
    return null;
  }

  return redirect(`/${department}`);
}

export function repositoryLoader() {
  const token = getAuthToken();
  if(!token)
    return redirect('/login');

  const department = localStorage.getItem('department');

  if (department == "repository" || department == "userManagement") {
    return null;
  }

  return redirect(`/${department}`);
}

export function userManagementLoader() {
  const token = getAuthToken();
  if(!token)
    return redirect('/login');

  const department = localStorage.getItem('department');

  if (department == "userManagement") {
    return null;
  }

  return redirect(`/${department}`);
}