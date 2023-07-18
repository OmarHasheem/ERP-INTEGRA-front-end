import EmployeeControllerForm from '../../../components/HR/EmployeeController/EmployeeControllerForm';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './EditEmployee.module.scss';
const EditEmployeePage = () => {
  const { data: employee } = useRouteLoaderData('employee-detail');

  return (
    <div className={classes.EditEmployee}>
      <h1> HR > Employee > Edit {employee.name} </h1>
      <EmployeeControllerForm method="put" employee={employee} />
    </div>
  );
};

export default EditEmployeePage;
