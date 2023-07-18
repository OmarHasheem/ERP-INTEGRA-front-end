import { Link, useSubmit } from 'react-router-dom';
import classes from './RoleItem.module.scss';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { usePermission, useRolesPermission } from "../../../hooks/useApi";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import RolesSelectPermissions from './RolesSelectPermissions';
// import { useEmployeeBenefits } from '../../../hooks/useApi';
// import BenefitEmployeeShow from './BenefitEmployeeShow';
const RoleItem = ({ role }) => {
  // const [employeesBenefit, setEmployeesBenefit] = useState([]);
  const submit = useSubmit();

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };
  
  const [rolePermissionInfo,setRolePermissionInfo] = useState([])
  const rolesPermission = useRolesPermission(role.id);

  useEffect(() => {
    setRolePermissionInfo(rolesPermission);
  }, [rolesPermission]);

  
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <div className={classes.roleItem}>
      <h1> Administration > Role > {role.name} </h1>
      <div className={classes.box}>
        <Card className={classes.card}>
          <div className={classes.cardItems}>
            <label>Name of Benefit :</label>
            <p> {role.name} </p>
          </div>
            <label>Role Permissions :</label>
          <div className={classes.cardItems}>
            <select>
              <option>-- Your Permissions --</option>
            {rolePermissionInfo.map((rolePermission)=>(
            <option key={rolePermission.id} disabled> {rolePermission.name} </option>
            ))}
            </select>
          </div>
       
          <div className={classes.btn}>
            <Link
              className={classes.link}
              to={`/userManagement/roles/role-detail/edit/${role.id}`}
            >
              Edit
            </Link>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        </Card>
        <div className={classes.RolesSelectPermissions}>
      <div className={classes.btnBox}>
  
      <h2>Give Permission :</h2>
   
     </div>
          <RolesSelectPermissions rolePermission={rolePermissionInfo} />
    </div>
      </div>
    </div>
  );
};

export default RoleItem;
