import { json, useLoaderData } from 'react-router-dom';
import UsersList from '../../../components/Administration/User/UserList';
import { getAuthToken } from '../../../hooks/auth';
import classes from './User.module.scss';
const UsersPage = () => {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <div className={classes.UsersPage}>
      <UsersList users={data} />
    </div>
  );
};

export default UsersPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/userManagement/users', {
    headers: {
      Authorization: 'bearer' + token,
    },
  });
  console.log(response);
  if (!response.ok) {
    throw json({ message: 'Could not fetch users.' }, { status: 500 });
  } else {
    return response;
  }
}
