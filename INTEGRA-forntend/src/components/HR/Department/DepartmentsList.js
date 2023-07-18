import { Link, useNavigate } from 'react-router-dom';
import classes from './DepartmentsList.module.scss';
const DepartmentsList = ({ departments }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.DepartmentsList}>
      <h1> HR > Departments </h1>
      <div className={classes.add_department}>
        <Link className={classes.add_department_link} to="/hr/departments/new">
          Add New Department
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr
              key={department.id}
              onClick={() =>
                navigate(`/hr/departments/department-detail/${department.id}`)
              }
            >
              <td>{department.name}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Name</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DepartmentsList;
