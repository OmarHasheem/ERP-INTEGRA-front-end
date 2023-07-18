import EmployeeVacationForm from '../../../components/HR/EmployeeVacationController/EmployeeVacationForm';
import classes from './NewEmployeeVacation.module.scss';
const NewEmployeeVacationPage = () => {
  return (
    <div className={classes.NewEmployeeVacationPage}>
      <h1> Add New Employee Vacation</h1>
      <EmployeeVacationForm method="post" />
    </div>
  );
};

export default NewEmployeeVacationPage;
