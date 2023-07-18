import UserForm from '../../../components/Administration/User/UserForm';
import classes from './NewUser.module.scss';
const NewUserPage = () => {
  return (
    <div className={classes.NewUserPage}>
      <h1> Add New User</h1>
      <UserForm method="post" />
    </div>
  );
};

export default NewUserPage;
