import UserForm from '../../../components/Administration/User/UserForm';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './editUser.module.scss';
const EditUserPage = () => {
  const { data: user } = useRouteLoaderData('user-detail');

  return (
    <div className={classes.editUser}>
      <h1> Admainistrasion > User > Edit {user.name} </h1>
      <UserForm method="put" user={user} />
    </div>
  );
};

export default EditUserPage;
