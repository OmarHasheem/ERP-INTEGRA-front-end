import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import EmployeeVacationItem from '../../../components/HR/EmployeeVacationController/EmployeeVacationItem';
import { getAuthToken } from '../../../hooks/auth';

const EmployeeVacationDetailPage = () => {
  const { data } = useRouteLoaderData('employeeVacation-detail');

  return <EmployeeVacationItem employeeVacation={data} />;
};

export default EmployeeVacationDetailPage;

export async function loader({ request, params }) {
  const id = params.employeeVacationId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/hr/employeeVacations/' + id,
    {
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected employee vacations ' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action({ request, params }) {
  const id = params.employeeVacationId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/hr/employeeVacations/' + id,
    {
      method: request.method,
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not delete employee vacations.' },
      { status: 500 }
    );
  }

  return redirect('/hr/employeeVacations');
}
