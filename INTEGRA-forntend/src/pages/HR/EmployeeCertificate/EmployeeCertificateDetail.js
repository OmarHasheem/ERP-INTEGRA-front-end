import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import EmployeeCertificateItem from '../../../components/HR/EmployeeCertificate/EmployeeCertificateItem';
import { getAuthToken } from '../../../hooks/auth';

const EmployeeCertificateDetailPage = () => {
  const { data } = useRouteLoaderData('employeeCertificate-detail');

  return <EmployeeCertificateItem employeeCertificate={data} />;
};

export default EmployeeCertificateDetailPage;

export async function loader({ request, params }) {
  const id = params.employeeCertificateId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/hr/employeeCertificates/' + id,
    {
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected employee certificates' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action({ request, params }) {
  const id = params.employeeCertificateId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/hr/employeeCertificates/' + id,
    {
      method: request.method,
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not delete employee certificates.' },
      { status: 500 }
    );
  }

  return redirect('/hr/employeeCertificates');
}
