import { Link, redirect, useNavigate } from 'react-router-dom';
import classes from './ImportsList.module.scss';
const ImportsList = ({ imports }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.importsList}>
      <h1> Repository > Imports </h1>
      <div className={classes.add_import}>
        <Link
          className={classes.add_import_link}
          to="/repository/imports/new"
        >
          Add New Import
        </Link>
      </div>
      <table>
        <thead>
        <tr>
          <th>Import Id</th>
          <th>Name</th>
          <th>Date</th>
          <th>Total amount</th>
          <th>Supplier Id</th>
          <th>Employee Id</th>
        </tr>
        </thead>
        <tbody>
        {imports.map((importItem) => (
          <tr
            key={importItem.id}
            onClick={() =>
              navigate(`/repository/imports/import-detail/${importItem.id}`)
            }
          >
            <td>{importItem.id}</td>
            <td>{importItem.name}</td>
            <td>{importItem.date}</td>
            <td>{importItem.total_amount}</td>
            <td>{importItem.supplier_id}</td>
            <td>{importItem.employee_id}</td>
          </tr>
        ))}
        </tbody>
        <tfoot>
        <tr>
          <th>Import Id</th>
          <th>Name</th>
          <th>Date</th>
          <th>Total amount</th>
          <th>Supplier Id</th>
          <th>Employee Id</th>
        </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ImportsList;
