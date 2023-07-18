import { Link, useNavigate } from 'react-router-dom';
import classes from './PermissionList.module.scss';
const PermissionsList = ({ permissions }) => {
  const navigate = useNavigate();
  console.log(permissions);
  return (
    <div className={classes.permissionsList}>
      <h1> Administration > Permission </h1>
      {/* <div className={classes.add_permission}>
        <Link className={classes.add_permission_link} to="/userManagement/permissions/new">
          Add New Benefit
        </Link>
      </div> */}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr
              key={permission.id}
            >
              <td>{permission.id}</td>
              <td>{permission.name}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PermissionsList;
