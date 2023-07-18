import EmployeePerformanceForm from '../../../components/HR/EmployeePerformanceController/EmployeePerformanceForm';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './EditEmployeePerformance.module.scss';
const EditEmployeePerformancePage = () => {
  const { data: employeePerformance } = useRouteLoaderData(
    'employeePerformance-detail'
  );

  return (
    <div className={classes.EditEmployeePerformance}>
      <h1> HR > Employee Performance > Edit {employeePerformance.name} </h1>
      <EmployeePerformanceForm
        method="put"
        employeePerformance={employeePerformance}
      />
    </div>
  );
};

export default EditEmployeePerformancePage;
