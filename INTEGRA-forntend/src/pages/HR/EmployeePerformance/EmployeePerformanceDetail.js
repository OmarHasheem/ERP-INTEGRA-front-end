import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import EmployeePerformanceItem from '../../../components/HR/EmployeePerformanceController/EmployeePerformanceItem';
import { getAuthToken } from '../../../hooks/auth';

const EmployeePerformanceDetailPage = () => {
  const { data } = useRouteLoaderData('employeePerformance-detail');

  return <EmployeePerformanceItem employeePerformance={data} />;
};

export default EmployeePerformanceDetailPage;

export async function loader({ request, params }) {
  const id = params.employeePerformanceId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/hr/employeePerformances/' + id,
    {
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected employee performances' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action({ request, params }) {
  const id = params.employeePerformanceId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/hr/employeePerformances/' + id,
    {
      method: request.method,
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not delete employee performances.' },
      { status: 500 }
    );
  }

  return redirect('/hr/employeePerformances');
}
