import { Link, redirect, useNavigate } from 'react-router-dom';
import classes from './CustomersList.module.scss';
import CustomersTable from './UI/CustomersTable';
const CustomersList = ({ customers }) => {
  return (
    <div className={classes.customersList}>
      <div className={classes.add_customer}>
        <Link
          className={classes.add_customer_link}
          to="/marketing/customers/new"
        >
          Add New Customer
        </Link>
      </div>
        <CustomersTable customers={customers}/>
    </div>
  );
};

export default CustomersList;
