import { Link, useNavigate } from 'react-router-dom';
import classes from './EmployeeCertificateList.module.scss';
const EmployeeCertificatesList = ({ employeeCertificates }) => {
  const navigate = useNavigate();
  console.log(` the answer : ${employeeCertificates}`);
  return (
    <div className={classes.EmployeeCertificatesList}>
      <h1> HR > Employees Certificates </h1>
      <div className={classes.add_EmployeeCertificate}>
        <Link
          className={classes.add_EmployeeCertificate_link}
          to="/hr/EmployeeCertificates/new"
        >
          Add New Employee Certificate
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Employee id</th>
            <th>Name</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {employeeCertificates.map((employeeCertificate) => (
            <tr
              key={employeeCertificate.id}
              onClick={() =>
                navigate(
                  `/hr/employeeCertificates/employeeCertificate-detail/${employeeCertificate.id}`
                )
              }
            >
              <td>{employeeCertificate.employee_id}</td>
              <td>{employeeCertificate.name}</td>
              <td>{employeeCertificate.level}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Employee id</th>
            <th>Name</th>
            <th>Level</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default EmployeeCertificatesList;
