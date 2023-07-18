import { json, useLoaderData } from 'react-router-dom';
import EmployeeControllersList from '../../../components/HR/EmployeeController/EmployeeControllersList';
import { getAuthToken } from '../../../hooks/auth';
import classes from './EmployeeController.module.scss';
const EmployeeControllersPage = () => {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <div className={classes.EmployeeControllers}>
      <EmployeeControllersList employeeControllers={data} />
    </div>
  );
};

export default EmployeeControllersPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/hr/employees', {
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
