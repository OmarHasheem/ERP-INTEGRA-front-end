import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import EmployeeItem from '../../../components/HR/EmployeeController/EmployeeItem';
import { getAuthToken } from '../../../hooks/auth';

const EmployeeDetailPage = () => {
  const { data } = useRouteLoaderData('employee-detail');

  return <EmployeeItem employee={data} />;
};

export default EmployeeDetailPage;

export async function loader({ request, params }) {
  const id = params.employeeId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/hr/employees/' + id, {
    headers: {
      Authorization: 'bearer' + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected employees ' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action({ request, params }) {
  const id = params.employeeId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/hr/employees/' + id, {
    method: request.method,
    headers: {
      Authorization: 'bearer' + token,
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not delete employees.' }, { status: 500 });
  }

  return redirect('/hr/employees');
}
