import EmployeePerformanceForm from '../../../components/HR/EmployeePerformanceController/EmployeePerformanceForm';
import classes from './NewEmployeePerformance.module.scss';
const NewEmployeePerformancePage = () => {
  return (
    <div className={classes.NewEmployeePerformancePage}>
      <h1> Add New Employee Performance</h1>
      <EmployeePerformanceForm method="post" />
    </div>
  );
};

export default NewEmployeePerformancePage;
