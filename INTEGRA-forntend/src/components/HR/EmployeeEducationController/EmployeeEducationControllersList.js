import { Link, useNavigate } from 'react-router-dom';
import classes from './EmployeeEducationControllersList.module.scss';
const EmployeeEducationControllersList = ({ EmployeeEducationControllers }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.EmployeeEducationControllersList}>
      <h1> HR > Employees Educations </h1>
      <div className={classes.add_EmployeeEducation}>
        <Link
          className={classes.add_EmployeeEducation_link}
          to="/hr/employeeEducations/new"
        >
          Add New Employee Education
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Employee_id</th>
            <th>Specialization</th>
            <th>Degree</th>
            <th>GrantingBy</th>
            <th>GraduationDate</th>
          </tr>
        </thead>
        <tbody>
          {EmployeeEducationControllers.map((EmployeeEducationController) => (
            <tr
              key={EmployeeEducationController.id}
              onClick={() =>
                navigate(
                  `/hr/employeeEducations/employeeEducation-detail/${EmployeeEducationController.id}`
                )
              }
            >
              <td>{EmployeeEducationController.employee_id}</td>
              <td>{EmployeeEducationController.specialization}</td>
              <td>{EmployeeEducationController.degree}</td>
              <td>{EmployeeEducationController.grantingBy}</td>
              <td>{EmployeeEducationController.graduationDate}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Employee_id</th>
            <th>Specialization</th>
            <th>Degree</th>
            <th>GrantingBy</th>
            <th>GraduationDate</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default EmployeeEducationControllersList;
