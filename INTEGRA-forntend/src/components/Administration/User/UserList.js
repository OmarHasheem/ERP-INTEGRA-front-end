import { Link, useNavigate } from 'react-router-dom';
import classes from './UserList.module.scss';
const UsersList = ({ users }) => {
  const navigate = useNavigate();
  console.log(users);
  return (
    <div className={classes.UserList}>
      <h1> Administration > Users </h1>
      <div className={classes.add_User}>
        <Link className={classes.add_User_link} to="/userManagement/users/new">
          Add New User
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            {/* <th>Employee Id</th> */}
            <th>Fullname</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((User) => (
            <tr
              key={User.id}
              onClick={() =>
                navigate(`/userManagement/users/User-detail/${User.id}`)
              }
            >
              {/* <td>{User.id}</td> */}
              <td>{User.fullName}</td>
              <td>{User.username}</td>
              <td>{User.email}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            {/* <th>Employee Id</th> */}
            <th>Fullname</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default UsersList;
