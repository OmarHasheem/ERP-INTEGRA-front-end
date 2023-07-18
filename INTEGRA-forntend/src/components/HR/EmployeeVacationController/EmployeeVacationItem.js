import { Link, useSubmit } from 'react-router-dom';
import classes from './EmployeeVacationItem.module.scss';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
// import { useLeadsOfCustomer } from '../../../hooks/useApi';
const EmployeeVacationItem = ({ employeeVacation }) => {
  //   const [leads, setLeads] = useState([]);
  const submit = useSubmit();

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  //   const leadResponse = useLeadsOfCustomer(employeeVacation.id);

  //   useEffect(() => {
  //     setLeads(leadResponse);
  //   }, [leadResponse]);

  return (
    <div className={classes.employeeVacationItem}>
      <h1> HR > Employee Vacations > Vacation Details </h1>
      <div className={classes.box}>
        <Card className={classes.card}>
          <div className={classes.cardItems}>
            <label>Employee_id :</label>
            <p> {employeeVacation.employee_id} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Start Date :</label>
            <p> {employeeVacation.startDate} </p>
          </div>
          <div className={classes.cardItems}>
            <label>End Date :</label>
            <p> {employeeVacation.endDate} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Type Of Vacation :</label>
            <p> {employeeVacation.typeOfVacation} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Reason Of Vacation :</label>
            <p> {employeeVacation.reasonOfVacation} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Status :</label>
            <p> {employeeVacation.status} </p>
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
              to={`/hr/employeeVacations/employeeVacation-detail/edit/${employeeVacation.id}`}
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

export default EmployeeVacationItem;
