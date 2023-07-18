import { Link, useSubmit } from 'react-router-dom';
import classes from './EmployeePerformanceItem.module.scss';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
// import { useLeadsOfCustomer } from '../../../hooks/useApi';
const EmployeePerformanceItem = ({ employeePerformance }) => {
  //   const [leads, setLeads] = useState([]);
  const submit = useSubmit();

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  //   const leadResponse = useLeadsOfCustomer(employeePerformance.id);

  //   useEffect(() => {
  //     setLeads(leadResponse);
  //   }, [leadResponse]);

  return (
    <div className={classes.employeePerformanceItem}>
      <h1>HR > Employees Performances > Performance Details</h1>
      <div className={classes.box}>
        <Card className={classes.card}>
          <div className={classes.cardItems}>
            <label>Employee_id :</label>
            <p> {employeePerformance.employee_id} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Performance Rating :</label>
            <p> {employeePerformance.performanceRating} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Comments :</label>
            <p> {employeePerformance.comments} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Review Date :</label>
            <p> {employeePerformance.reviewDate} </p>
          </div>
          {/* <div className={classes.cardItems}>
            <label>Leads of Customer:</label>
            <p>
              {' '}
              {leads.map((lead) => (
                <Link
                  key={lead.id}
                  className={classes.leadLink}
                  to={`/marketing/leads/lead-detail/${lead.id}`}
                >
                  {' '}
                  {lead.type}{' '}
                </Link>
              ))}{' '}
            </p>
          </div> */}
          <div className={classes.btn}>
            <Link
              className={classes.link}
              to={`/hr/employeePerformances/employeePerformance-detail/edit/${employeePerformance.id}`}
            >
              Edit
            </Link>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmployeePerformanceItem;
