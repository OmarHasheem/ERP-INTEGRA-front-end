import classes from './BenefitEmployeeShow.module.scss';
const BenefitEmployeeShow = ({ data }) => {
  console.log(data)
  return (
    <div className={classes.benefitEmployeeShow}>
      <table>
        <thead>
          <tr>
            <th>Employee id</th>
            <th>Employee Name</th>
            <th>Enrollment Date</th>
            <th>Coverage Start Date</th>
            <th>Coverage End Date</th>
          </tr>
        </thead>
        <tbody>
           {data.map((emp_benefits, index) => (
          <tr key={index}>
            <td>{emp_benefits.id}</td>
            <td>{emp_benefits.firstName + ' ' + emp_benefits.lastName}</td>
            <td>{emp_benefits.enrollmentDate}</td>
            <td>{emp_benefits.coverageStartDate}</td>
            <td>{emp_benefits.coverageEndDate}</td>
          </tr>
           ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Employee id</th>
            <th>Employee Name</th>
            <th>Enrollment Date</th>
            <th>Coverage Start Date</th>
            <th>Coverage End Date</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default BenefitEmployeeShow;
