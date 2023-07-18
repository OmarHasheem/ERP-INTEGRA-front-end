import CustomerForm from '../../../components/Marketing/customer/CustomerForm';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './editCustomer.module.scss';
const EditCustomerPage = () => {
  const { data: customer } = useRouteLoaderData('customer-detail');

  return (
    <div className={classes.editCustomer}>
      <h1> Marketing > Customers > Edit {customer.name} </h1>
      <CustomerForm method="put" customer={customer} />
    </div>
  );
};

export default EditCustomerPage;
