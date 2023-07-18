import { json, useLoaderData } from 'react-router-dom';
import EmployeeEducationControllersList from '../../../components/HR/EmployeeEducationController/EmployeeEducationControllersList';
import { getAuthToken } from '../../../hooks/auth';
import classes from './EmployeeEducationControllerPage.module.scss';
const EmployeeEducationControllersPage = () => {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <div className={classes.EmployeeEducationControllersPage}>
      <EmployeeEducationControllersList EmployeeEducationControllers={data} />
    </div>
  );
};

export default EmployeeEducationControllersPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/hr/employeeEducations', {
    headers: {
      Authorization: 'bearer' + token,
    },
  });
  console.log(response);
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch EmployeeController.' },
      { status: 500 }
    );
  } else {
    return response;
  }
}
