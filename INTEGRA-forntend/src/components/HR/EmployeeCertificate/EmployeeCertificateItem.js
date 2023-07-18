import { Link, useSubmit } from 'react-router-dom';
import classes from './EmployeeCertificateItem.module.scss';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
// import { useLeadsOfCustomer } from '../../../hooks/useApi';
const EmployeeCertificateItem = ({ employeeCertificate }) => {
  //   const [leads, setLeads] = useState([]);
  const submit = useSubmit();

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  //   const leadResponse = useLeadsOfCustomer(employeeCertificate.id);

  //   useEffect(() => {
  //     setLeads(leadResponse);
  //   }, [leadResponse]);

  return (
    <div className={classes.employeeCertificateItem}>
      <h1> HR > Employees Certificates > {employeeCertificate.name} </h1>
      <div className={classes.box}>
        <Card className={classes.card}>
          <div className={classes.cardItems}>
            <label>Employee Id :</label>
            <p> {employeeCertificate.employee_id} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Name of Certificate :</label>
            <p> {employeeCertificate.name} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Level :</label>
            <p> {employeeCertificate.level} </p>
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
              to={`/hr/employeeCertificates/employeeCertificate-detail/edit/${employeeCertificate.id}`}
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

export default EmployeeCertificateItem;
