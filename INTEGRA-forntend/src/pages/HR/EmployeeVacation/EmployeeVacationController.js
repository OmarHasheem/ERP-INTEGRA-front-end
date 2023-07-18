import { json, useLoaderData } from 'react-router-dom';
import EmployeeVacationControllersList from '../../../components/HR/EmployeeVacationController/EmployeeVacationControllersList';
import { getAuthToken } from '../../../hooks/auth';
import classes from './EmployeeVacationController.module.scss';
const EmployeeVacationControllersPage = () => {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <div className={classes.EmployeeVacationControllersPage}>
      <EmployeeVacationControllersList employeeVacationControllers={data} />
    </div>
  );
};

export default EmployeeVacationControllersPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/hr/employeeVacations', {
    headers: {
      Authorization: 'bearer' + token,
    },
  });
  console.log(response);
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch Employee Vacations.' },
      { status: 500 }
    );
  } else {
    return response;
  }
}
