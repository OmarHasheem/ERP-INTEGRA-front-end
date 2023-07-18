import { json, Link, useNavigate, useSubmit } from 'react-router-dom';
import classes from './LeadItem.module.scss';
import { Card } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useCampaignsOfLead, useCustomers, useCustomersOfLead, useLeadsOfCustomer } from '../../../hooks/useApi';
import classe from '../customer/CustomersList.module.scss';
import CustomersTable from '../customer/UI/CustomersTable';
import { getAuthToken } from '../../../hooks/auth';

const LeadItem = ({ lead }) => {
  const [customersOfLead, setCustomersOfLead] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [editCustomer, setEditCustomer] = useState({ id: 0, type: '' });
  const submit = useSubmit();

  const navigate = useNavigate();

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  const customerOfLeadResponse = useCustomersOfLead(lead.id);
  const customerResponse = useCustomers();
  const campaignResponse = useCampaignsOfLead(lead.id);

  useEffect(() => {
    setCustomersOfLead(customerOfLeadResponse);
  }, [customerOfLeadResponse]);

  useEffect(() => {
    setCustomers(customerResponse);
  }, [customerResponse]);

  useEffect(() => {
    setCampaigns(campaignResponse);
  }, [campaignResponse]);

  const removeById = (arr, id) => {
    const requiredIndex = arr.findIndex(el => {
      return el.id == id;
    });
    if (requiredIndex === -1) {
      return false;
    }
    ;

    return !!arr.splice(requiredIndex, 1);
  };

  const addById = (arr, id) => {
    customers.map((customer) => {
      if (customer.id == id) {
        arr.push(customer);
        return;
      }
    });
  };

  const checkHandler = (event) => {
    if (event.target.checked) {
      addById(customersOfLead, event.target.value);
      setEditCustomer({ id: event.target.value, type: 'attach' });
    } else {
      removeById(customersOfLead, event.target.value);
      setEditCustomer({ id: event.target.value, type: 'detach' });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        const campaignData = {
          customer_id: editCustomer.id
        };

        let url;
        if (editCustomer.type == 'attach') {
          url = 'http://localhost:8000/marketing/leads/attachLeadToCustomer/' + lead.id;
        } else {
          url = 'http://localhost:8000/marketing/leads/detachLeadToCustomer/' + lead.id;
        }

        const response = await fetch(url, {
          method: 'post',
          headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(campaignData)
        });

        if (!response.ok)
          throw json(
            { message: 'Could not add customer to lead.' },
            { status: 500 }
          );
      } catch (error) {
        console.error(error);
      }
    };
    if (editCustomer.id > 0)
      fetchData();
  }, [editCustomer]);

  return (
    <div className={classes.leadItem}>
      <h1> Marketing > Lead Item > {lead.type} </h1>
      <div className={classes.box}>
        <Card className={classes.card}>
          <div className={classes.cardItems}>
            <label>Name of Lead :</label>
            <p> {lead.type} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Campaigns of Leads:</label>
            <p>
              {campaigns.length > 0 && campaigns.map((campaign, index) => (
                <Fragment key={campaign.id}>
                  {index > 0 && ' - '}
                  <Link className={classes.campaignLink}
                        to={`/marketing/campaigns/campaign-detail/${campaign.id}`}>{campaign.name}</Link>
                </Fragment>
              ))}
            </p>
          </div>
          <div className={classes.btn}>
            <Link
              className={classes.link}
              to={`/marketing/leads/lead-detail/edit/${lead.id}`}
            >
              Edit
            </Link>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        </Card>
      </div>
      <div className={classe.customersList}>
        <table>
          <thead>
          <tr>
            <th>Customer Id</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              onClick={() =>
                navigate(`/marketing/customers/customer-detail/${customer.id}`)
              }
            >
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.gender}</td>
              <td>{customer.age}</td>
              <td>{customer.address}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td onClick={(event) => event.stopPropagation()} ><input type='checkbox' value={customer.id}
                         checked={JSON.stringify(customersOfLead).includes(JSON.stringify(customer))}
                         onChange={checkHandler}
              /></td>
            </tr>
          ))}
          </tbody>
          <tfoot>
          <tr>
            <th>Customer Id</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th></th>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default LeadItem;
