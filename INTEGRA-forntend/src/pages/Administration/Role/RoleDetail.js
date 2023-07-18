import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import RoleItem from '../../../components/Administration/Role/RoleItem';
import { getAuthToken } from '../../../hooks/auth';

const RoleDetailPage = () => {
  const { data } = useRouteLoaderData('role-detail');

  return <RoleItem role={data} />;
};

export default RoleDetailPage;

export async function loader({ request, params }) {
  const id = params.roleId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/userManagement/roles/' + id,
    {
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected roles' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action({ request, params }) {
  const id = params.roleId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/userManagement/roles/' + id,
    {
      method: request.method,
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json({ message: 'Could not delete roles.' }, { status: 500 });
  }

  return redirect('/userManagement/roles');
}
