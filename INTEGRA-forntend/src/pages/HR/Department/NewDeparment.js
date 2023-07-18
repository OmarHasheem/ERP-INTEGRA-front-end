import DepartmentForm from '../../../components/HR/Department/DepartmentForm';
import classes from './NewDepartment.module.scss';
const NewDepartmentPage = () => {
  return (
    <div className={classes.NewDepartmentPage}>
      <h1> Add New Department</h1>
      <DepartmentForm method="post" />
    </div>
  );
};

export default NewDepartmentPage;
