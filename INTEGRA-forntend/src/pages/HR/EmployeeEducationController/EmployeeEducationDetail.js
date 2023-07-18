import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import EmployeeEducationItem from '../../../components/HR/EmployeeEducationController/EmployeeEducationItem';
import { getAuthToken } from '../../../hooks/auth';

const EmployeeEducationDetailPage = () => {
  const { data } = useRouteLoaderData('employeeEducation-detail');

  return <EmployeeEducationItem employeeEducation={data} />;
};

export default EmployeeEducationDetailPage;

export async function loader({ request, params }) {
  const id = params.employeeEducationId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/hr/employeeEducations/' + id,
    {
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected employee educations' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action({ request, params }) {
  const id = params.employeeEducationId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/hr/employeeEducations/' + id,
    {
      method: request.method,
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not delete employee educations.' },
      { status: 500 }
    );
  }

  return redirect('/hr/employeeEducations');
}
