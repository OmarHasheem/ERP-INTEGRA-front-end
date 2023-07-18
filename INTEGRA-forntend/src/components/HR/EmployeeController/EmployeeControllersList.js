import { Link, useNavigate } from 'react-router-dom';
import classes from './EmployeeControllersList.module.scss';
const EmployeeControllersList = ({ employeeControllers }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.EmployeeList}>
      <h1> HR > Employees</h1>
      <div className={classes.add_Employee}>
        <Link className={classes.add_Employee_link} to="/hr/employees/new">
          Add New Employee
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date Of Hire</th>
            <th>Salary</th>
            <th>Supervisor Id</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employeeControllers.map((employeeController) => (
            <tr
              key={employeeController.id}
              onClick={() =>
                navigate(
                  `/hr/employees/employee-detail/${employeeController.id}`
                )
              }
            >
              <td>{employeeController.firstName}</td>
              <td>{employeeController.lastName}</td>
              <td>{employeeController.gender}</td>
              <td>{employeeController.email}</td>
              <td>{employeeController.phone}</td>
              <td>{employeeController.dateOfHire}</td>
              <td>{employeeController.salary}</td>
              <td>{employeeController.supervisorId}</td>
              <td>{employeeController.status}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date Of Hire</th>
            <th>Salary</th>
            <th>Supervisor Id</th>
            <th>Status</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default EmployeeControllersList;
