import { json, useLoaderData } from 'react-router-dom';
import PermissionsList from '../../../components/Administration/Permission/PermissionList';
import { getAuthToken } from '../../../hooks/auth';
import classes from './Permission.module.scss';
const PermissionPage = () => {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <div className={classes.PermissionPage}>
      <PermissionsList permissions={data} />
    </div>
  );
};

export default PermissionPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/userManagement/permissions',
    {
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );
  console.log(response);
  if (!response.ok) {
    throw json({ message: 'Could not fetch permissions.' }, { status: 500 });
  } else {
    return response;
  }
}
