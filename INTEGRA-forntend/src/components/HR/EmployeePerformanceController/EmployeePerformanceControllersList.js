import { Link, useNavigate } from 'react-router-dom';
import classes from './EmployeePerformanceControllersList.module.scss';
const EmployeePerformanceControllersList = ({
  employeePerformanceControllers,
}) => {
  const navigate = useNavigate();
  return (
    <div className={classes.EmployeePerformanceList}>
      <h1> HR > Employees Performances </h1>
      <div className={classes.add_EmployeePerformance}>
        <Link
          className={classes.add_EmployeePerformance_link}
          to="/hr/employeePerformances/new"
        >
          Add New Employee Performance
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Employee_id</th>
            <th>PerformanceRating</th>
            <th>Comments</th>
            <th>Review Date</th>
          </tr>
        </thead>
        <tbody>
          {employeePerformanceControllers.map(
            (employeePerformanceController) => (
              <tr
                key={employeePerformanceController.id}
                onClick={() =>
                  navigate(
                    `/hr/employeePerformances/employeePerformance-detail/${employeePerformanceController.id}`
                  )
                }
              >
                <td>{employeePerformanceController.employee_id}</td>
                <td>{employeePerformanceController.performanceRating}</td>
                <td>{employeePerformanceController.comments}</td>
                <td>{employeePerformanceController.reviewDate}</td>
              </tr>
            )
          )}
        </tbody>
        <tfoot>
          <tr>
            <th>Employee_id</th>
            <th>PerformanceRating</th>
            <th>Comments</th>
            <th>Review Date</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default EmployeePerformanceControllersList;
