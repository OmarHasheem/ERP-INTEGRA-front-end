import { Link, useSubmit } from 'react-router-dom';
import classes from './CustomerItem.module.scss';
import { Card } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useLeadsOfCustomer } from '../../../hooks/useApi';
const CustomerItem = ({ customer }) => {
  const [leads, setLeads] = useState([]);
  const submit = useSubmit();

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  const leadResponse = useLeadsOfCustomer(customer.id);

  useEffect(() => {
    setLeads(leadResponse);
  }, [leadResponse]);

  return (
    <div className={classes.customerItem}>
      <h1> Marketing > Customer > {customer.name} </h1>
      <div className={classes.box}>
        <Card className={classes.card}>
          <div className={classes.cardItems}>
            <label>Name of Customer :</label>
            <p> {customer.name} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Gender :</label>
            <p> {customer.gender} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Age :</label>
            <p> {customer.age} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Address :</label>
            <p> {customer.address} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Email :</label>
            <p> {customer.email} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Phone :</label>
            <p> {customer.phone} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Leads of Customer:</label>
            <p> {leads.length > 0 && leads.map((lead, index) => (
              <Fragment key={lead.id}>
                {index > 0 && ' - '}
                <Link className={classes.leadLink} to={`/marketing/leads/lead-detail/${lead.id}`}>{lead.type}</Link>
              </Fragment>
            ))} </p>
          </div>
          <div className={classes.btn}>
            <Link
              className={classes.link}
              to={`/marketing/campaigns/campaign-detail/edit/${customer.id}`}
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

export default CustomerItem;
