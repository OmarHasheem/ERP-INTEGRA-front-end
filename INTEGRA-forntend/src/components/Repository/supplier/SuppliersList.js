import { Link, redirect, useNavigate } from 'react-router-dom';
import classes from './SuppliersList.module.scss';
const SuppliersList = ({ suppliers }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.suppliersList}>
      <h1> Repository > Suppliers </h1>
      <div className={classes.add_supplier}>
        <Link
          className={classes.add_supplier_link}
          to="/repository/suppliers/new"
        >
          Add New Supplier
        </Link>
      </div>
      <table>
        <thead>
        <tr>
          <th>Supplier Id</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone Number</th>
        </tr>
        </thead>
        <tbody>
        {suppliers.map((supplier) => (
          <tr
            key={supplier.id}
            onClick={() =>
              navigate(`/repository/suppliers/supplier-detail/${supplier.id}`)
            }
          >
            <td>{supplier.id}</td>
            <td>{supplier.name}</td>
            <td>{supplier.address}</td>
            <td>{supplier.phone_number}</td>
          </tr>
        ))}
        </tbody>
        <tfoot>
        <tr>
          <th>Supplier Id</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone Number</th>
        </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default SuppliersList;
