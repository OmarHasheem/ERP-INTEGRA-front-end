import EmployeeControllerForm from '../../../components/HR/EmployeeController/EmployeeControllerForm';
import classes from './NewEmployeeController.module.scss';
const NewEmployeeControllerPage = () => {
  return (
    <div className={classes.NewEmployeeControllerPage}>
      <h1> Add New Employee</h1>
      <EmployeeControllerForm method="post" />
    </div>
  );
};

export default NewEmployeeControllerPage;
