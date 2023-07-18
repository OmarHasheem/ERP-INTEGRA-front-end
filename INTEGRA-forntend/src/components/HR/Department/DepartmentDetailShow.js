import { Card } from '@mui/material';
import classes from './DepartmentDetailShow.module.scss';
const DepartmentDetailShow = ({ employees }) => {
  return (
    <div className={classes.DepartmentDetailShow}>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Supervisor Id</th>
            <th>Date Of Brith</th>
            <th>Date Of Hire</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employeesDetail) => (
            <tr>
              <td>{employeesDetail.firstName}</td>
              <td>{employeesDetail.lastName}</td>
              <td>{employeesDetail.address}</td>
              <td>{employeesDetail.gender}</td>
              <td>{employeesDetail.email}</td>
              <td>{employeesDetail.phone}</td>
              <td>{employeesDetail.salary}</td>
              <td>{employeesDetail.status}</td>
              <td>{employeesDetail.supervisorId}</td>
              <td>{employeesDetail.dateOfBrith}</td>
              <td>{employeesDetail.dateOfHire}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Supervisor Id</th>
            <th>Date Of Brith</th>
            <th>Date Of Hire</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DepartmentDetailShow;
