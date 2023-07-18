import SupplierForm from '../../../components/Repository/supplier/SupplierForm';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './EditSupplier.module.scss'
const EditSupplierPage = () => {
  const { data: supplier } = useRouteLoaderData('supplier-detail');

  return (
    <div className={classes.EditSupplierPage}>
      <h1> Repository > Suppliers > Edit {supplier.name} </h1>
      <SupplierForm method="put" supplier={supplier} />
    </div>
  );
};

export default EditSupplierPage;
