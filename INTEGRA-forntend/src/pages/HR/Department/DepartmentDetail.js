import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import DepartmentItem from '../../../components/HR/Department/DepartmentItem';
import { getAuthToken } from '../../../hooks/auth';

const DepartmentDetailPage = () => {
  const { data } = useRouteLoaderData('department-detail');

  return <DepartmentItem department={data} />;
};

export default DepartmentDetailPage;

export async function loader({ request, params }) {
  const id = params.departmentId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/hr/departments/' + id, {
    headers: {
      Authorization: 'bearer' + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected departments' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action({ request, params }) {
  const id = params.departmentId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/hr/departments/' + id, {
    method: request.method,
    headers: {
      Authorization: 'bearer' + token,
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not delete departments.' }, { status: 500 });
  }

  return redirect('/hr/departments');
}
