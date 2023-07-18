import { Link, useSubmit } from 'react-router-dom';
import classes from './BenefitItem.module.scss';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useEmployeeBenefits } from '../../../hooks/useApi';
import BenefitEmployeeShow from './BenefitEmployeeShow';
import UpdateEmployeesOfBenefit from './UI/UpdateEmployeesOfBenefit';
const BenefitItem = ({ benefit }) => {
  const [employeesBenefit, setEmployeesBenefit] = useState([]);
  const [editEmployeeBenefit, setEditEmployeeBenefit] = useState(false);
  const submit = useSubmit();

  const updateEmployeeHandler = () => {
    setEditEmployeeBenefit(!editEmployeeBenefit);
  };

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  const employeesBenefitResponse = useEmployeeBenefits(benefit.id);

  useEffect(() => {
    setEmployeesBenefit(employeesBenefitResponse);
  }, [employeesBenefitResponse]);

    console.log(employeesBenefit);
  return (
    <div className={classes.benefitItem}>
      <h1> HR > Benefit > {benefit.name} </h1>
      <div className={classes.box}>
        <Card className={classes.card}>
          <div className={classes.cardItems}>
            <label>Name of Benefit :</label>
            <p> {benefit.name} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Cost :</label>
            <p> {benefit.cost} </p>
          </div>
          <div className={classes.btn}>
            <button onClick={updateEmployeeHandler}>
              {!editEmployeeBenefit && <>Update employees</>}
              {editEmployeeBenefit && <>Go back to Details</>}
            </button>
            <Link
              className={classes.link}
              to={`/hr/benefits/benefits-detail/edit/${benefit.id}`}
            >
              Edit
            </Link>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        </Card>
      </div>
      {!editEmployeeBenefit && <BenefitEmployeeShow data={employeesBenefit} />}
      {editEmployeeBenefit && (
        <UpdateEmployeesOfBenefit employeesOfBenefit={employeesBenefit} />
      )}
    </div>
  );
};

export default BenefitItem;
