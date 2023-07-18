import CustomerForm from '../../../components/Marketing/customer/CustomerForm';
import classes from './newCutomer.module.scss';
const NewCustomerPage = () => {
  return (
    <div className={classes.newcustomer}>
      <h1> Marketing > Customers > Create New Customer </h1>
      <CustomerForm method="post" />
    </div>
  );
};

export default NewCustomerPage;
