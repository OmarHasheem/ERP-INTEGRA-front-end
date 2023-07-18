import { json, useLoaderData } from 'react-router-dom';
import EmployeePerformanceControllersList from '../../../components/HR/EmployeePerformanceController/EmployeePerformanceControllersList';
import { getAuthToken } from '../../../hooks/auth';
import classes from './EmployeePerformanceController.module.scss';
const EmployeePerformanceControllersPage = () => {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <div className={classes.EmployeePerformanceControllersPage}>
      <EmployeePerformanceControllersList
        employeePerformanceControllers={data}
      />
    </div>
  );
};

export default EmployeePerformanceControllersPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/hr/employeePerformances',
    {
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );
  console.log(response);
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch Employee Performance.' },
      { status: 500 }
    );
  } else {
    return response;
  }
}
