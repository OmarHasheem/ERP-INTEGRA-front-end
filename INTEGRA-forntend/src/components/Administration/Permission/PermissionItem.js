import { Link, useSubmit } from 'react-router-dom';
import classes from './PermissionItem.module.scss';
import { Card } from '@mui/material';
// import { useEffect, useState } from 'react';
// import { useEmployeeBenefits } from '../../../hooks/useApi';
// import BenefitEmployeeShow from './BenefitEmployeeShow';
const PermissionItem = ({ permission }) => {
  // const [employeesBenefit, setEmployeesBenefit] = useState([]);
  const submit = useSubmit();

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  // const employeesBenefitResponse = useEmployeeBenefits(permission.id);

  // console.log(employeesBenefitResponse);
  // useEffect(() => {
  //   setEmployeesBenefit(employeesBenefitResponse);
  // }, [employeesBenefitResponse]);

  return (
    <div className={classes.permissionItem}>
      <h1> Administration > Permission > {permission.name} </h1>
      <div className={classes.box}>
        <Card className={classes.card}>
          <div className={classes.cardItems}>
            <label>Name of Benefit :</label>
            {/* <p> {permission.name} </p> */}
          </div>
          <div className={classes.cardItems}>
            <label>Cost :</label>
            {/* <p> {permission.cost} </p> */}
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
              to={`/userManagement/permissions/permissions-detail/edit/${permission.id}`}
            >
              Edit
            </Link>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        </Card>
      </div>
      {/* <BenefitEmployeeShow data={employeesBenefit} /> */}
    </div>
  );
};

export default PermissionItem;
