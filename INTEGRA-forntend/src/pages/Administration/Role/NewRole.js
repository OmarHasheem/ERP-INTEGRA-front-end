import RoleForm from '../../../components/Administration/Role/RoleForm';
import classes from './NewRole.module.scss';
const NewRolePage = () => {
  return (
    <div className={classes.NewRolePage}>
      <h1> Add New Role</h1>
      <RoleForm method="post" />
    </div>
  );
};

export default NewRolePage;
