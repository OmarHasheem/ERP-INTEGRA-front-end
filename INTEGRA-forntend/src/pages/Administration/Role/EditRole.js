import RoleForm from '../../../components/Administration/Role/RoleForm';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './editRole.module.scss';
const EditRolePage = () => {
  const { data: role } = useRouteLoaderData('role-detail');

  return (
    <div className={classes.editRole}>
      <h1> Admainistrasion > Role > Edit {role.name} </h1>
      <RoleForm method="put" role={role} />
    </div>
  );
};

export default EditRolePage;
