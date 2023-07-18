import { json, useLoaderData } from 'react-router-dom';
import DepartmentsList from '../../../components/HR/Department/DepartmentsList';
import { getAuthToken } from '../../../hooks/auth';
import classes from './Department.module.scss';
const DepartmentsPage = () => {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <div className={classes.department}>
      <DepartmentsList departments={data} />
    </div>
  );
};

export default DepartmentsPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/hr/departments', {
    headers: {
      Authorization: 'bearer' + token,
    },
  });
  console.log(response);
  if (!response.ok) {
    throw json({ message: 'Could not fetch departments.' }, { status: 500 });
  } else {
    return response;
  }
}
