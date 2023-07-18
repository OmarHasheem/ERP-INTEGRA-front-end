import { Link, redirect, useNavigate } from 'react-router-dom';
import classes from './ExportsList.module.scss';
const ExportsList = ({ exports }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.exportsList}>
      <h1> Repository > Exports </h1>
      <div className={classes.add_export}>
        <Link
          className={classes.add_export_link}
          to="/repository/exports/new"
        >
          Add New Export
        </Link>
      </div>
      <table>
        <thead>
        <tr>
          <th>Export Id</th>
          <th>Name</th>
          <th>Date</th>
          <th>Total amount</th>
          <th>Supplier Id</th>
          <th>Employee Id</th>
        </tr>
        </thead>
        <tbody>
        {exports.map((exportItem) => (
          <tr
            key={exportItem.id}
            onClick={() =>
              navigate(`/repository/exports/export-detail/${exportItem.id}`)
            }
          >
            <td>{exportItem.id}</td>
            <td>{exportItem.name}</td>
            <td>{exportItem.date}</td>
            <td>{exportItem.total_amount}</td>
            <td>{exportItem.customer_id}</td>
            <td>{exportItem.employee_id}</td>
          </tr>
        ))}
        </tbody>
        <tfoot>
        <tr>
          <th>Export Id</th>
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

export default ExportsList;
