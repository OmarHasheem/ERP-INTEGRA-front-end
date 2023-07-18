import EmployeeEducationForm from '../../../components/HR/EmployeeEducationController/EmployeeEducationForm';
import classes from './NewEmployeeEducationController.module.scss';
const NewEmployeeEducationControllerPage = () => {
  return (
    <div className={classes.NewEmployeeEducationControllerPage}>
      <h1> Add New Employee Education</h1>
      <EmployeeEducationForm method="post" />
    </div>
  );
};

export default NewEmployeeEducationControllerPage;
