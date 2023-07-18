import { Link, useSubmit } from 'react-router-dom';
import classes from './DepartmentItem.module.scss';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDepartmentEmployees } from '../../../hooks/useApi';
import DepartmentDetailShow from './DepartmentDetailShow';
const DepartmentItem = ({ department }) => {
  const [departmentEmployees, setDepartmentEmployees] = useState([]);
  const submit = useSubmit();

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };
  const departmentEmployeesResponse = useDepartmentEmployees(department.id);
  console.log(departmentEmployeesResponse);
  useEffect(() => {
    setDepartmentEmployees(departmentEmployeesResponse);
  }, [departmentEmployeesResponse]);

  return (
    <div className={classes.departmentItem}>
      <h1> HR > Department > {department.name} </h1>
      <div className={classes.box}>
        <Card className={classes.card}>
          <div className={classes.cardItems}>
            <label>Name of Department :</label>
            <p> {department.name} </p>
          </div>
          {/* <div className={classes.cardItems}>
            <label>Leads of Customer:</label>
            <p>
              {' '}
              {leads.map((lead) => (
                <Link
                  key={lead.id}
                  className={classes.leadLink}
                  to={`/marketing/leads/lead-detail/${lead.id}`}
                >
                  {' '}
                  {lead.type}{' '}
                </Link>
              ))}{' '}
            </p>
          </div> */}
          <div className={classes.btn}>
            <Link
              className={classes.link}
              to={`/hr/departments/department-detail/edit/${department.id}`}
            >
              Edit
            </Link>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        </Card>
      </div>
      <DepartmentDetailShow employees={departmentEmployees} />
    </div>
  );
};

export default DepartmentItem;
