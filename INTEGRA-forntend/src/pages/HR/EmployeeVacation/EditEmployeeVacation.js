import EmployeeVacationForm from '../../../components/HR/EmployeeVacationController/EmployeeVacationForm';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './EditEmployeeVacation.module.scss';
const EditEmployeeVacationPage = () => {
  const { data: employeeVacation } = useRouteLoaderData(
    'employeeVacation-detail'
  );

  return (
    <div className={classes.EditEmployeeVacation}>
      <h1> HR > Employee Vacation > Edit {employeeVacation.name} </h1>
      <EmployeeVacationForm method="put" employeeVacation={employeeVacation} />
    </div>
  );
};

export default EditEmployeeVacationPage;
