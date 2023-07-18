import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import UsersItem from '../../../components/Administration/User/UserItem';
import { getAuthToken } from '../../../hooks/auth';

const UserDetailPage = () => {
  const { data } = useRouteLoaderData('user-detail');

  return <UsersItem user={data} />;
};

export default UserDetailPage;

export async function loader({ request, params }) {
  const id = params.userId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/userManagement/users/' + id, {
    headers: {
      Authorization: 'bearer' + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected users' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action({ request, params }) {
  const id = params.userId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/userManagement/users/' + id, {
    method: request.method,
    headers: {
      Authorization: 'bearer' + token,
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not delete users.' }, { status: 500 });
  }

  return redirect('/userManagement/users');
}
