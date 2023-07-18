import { json, useLoaderData } from 'react-router-dom';
import RolesList from '../../../components/Administration/Role/RoleList';
import { getAuthToken } from '../../../hooks/auth';
import classes from './Role.module.scss';
const RolesPage = () => {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <div className={classes.RolesPage}>
      <RolesList roles={data} />
    </div>
  );
};

export default RolesPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/userManagement/roles', {
    headers: {
      Authorization: 'bearer' + token,
    },
  });
  console.log(response);
  if (!response.ok) {
    throw json({ message: 'Could not fetch roles.' }, { status: 500 });
  } else {
    return response;
  }
}
