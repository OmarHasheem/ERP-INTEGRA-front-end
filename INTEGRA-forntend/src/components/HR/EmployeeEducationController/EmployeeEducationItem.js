import { Link, useSubmit } from 'react-router-dom';
import classes from './EmployeeEducationItem.module.scss';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
// import { useLeadsOfCustomer } from '../../../hooks/useApi';
const EmployeeEducationItem = ({ employeeEducation }) => {
  //   const [leads, setLeads] = useState([]);
  const submit = useSubmit();

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  //   const leadResponse = useLeadsOfCustomer(employeeEducation.id);

  //   useEffect(() => {
  //     setLeads(leadResponse);
  //   }, [leadResponse]);

  return (
    <div className={classes.employeeEducationItem}>
      <h1> HR > Employees Educations > Education Detail </h1>
      <div className={classes.box}>
        <Card className={classes.card}>
          <div className={classes.cardItems}>
            <label>Employee_id :</label>
            <p> {employeeEducation.employee_id} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Specialization :</label>
            <p> {employeeEducation.specialization} </p>
          </div>
          <div className={classes.cardItems}>
            <label>degree :</label>
            <p> {employeeEducation.degree} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Granting By :</label>
            <p> {employeeEducation.grantingBy} </p>
          </div>
          <div className={classes.cardItems}>
            <label> Graduation Date :</label>
            <p> {employeeEducation.graduationDate} </p>
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
              to={`/hr/employeeEducations/employeeEducation-detail/edit/${employeeEducation.id}`}
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

export default EmployeeEducationItem;
