import { json, useLoaderData } from 'react-router-dom';
import EmployeeCertificatesList from '../../../components/HR/EmployeeCertificate/EmployeeCertificatesList';
import { getAuthToken } from '../../../hooks/auth';
import classes from './EmployeeCertificate.module.scss';
const EmployeeCertificatesPage = () => {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <div className={classes.EmployeeCertificate}>
      <EmployeeCertificatesList employeeCertificates={data} />
    </div>
  );
};

export default EmployeeCertificatesPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/hr/employeeCertificates',
    {
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );
  console.log(response);
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch Employee Certificate.' },
      { status: 500 }
    );
  } else {
    return response;
  }
}
