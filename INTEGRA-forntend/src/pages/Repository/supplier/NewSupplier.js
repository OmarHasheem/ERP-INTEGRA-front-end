import SupplierForm from '../../../components/Repository/supplier/SupplierForm';
import classes from './NewSupplier.module.scss'
const NewSupplierPage = () => {
  return (
    <div className={classes.NewSupplierPage}>
      <h1> Repository > Suppliers > Create New Supplier </h1>
      <SupplierForm method="post" />
    </div>
  );
};

export default NewSupplierPage;
