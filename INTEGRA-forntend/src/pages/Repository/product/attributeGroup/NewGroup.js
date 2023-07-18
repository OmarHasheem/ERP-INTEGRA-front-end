import GroupForm from '../../../../components/Repository/product/productAttribute/group/GroupForm';
import classes from './NewGroup.module.scss';
const NewGroupPage = () => {
  return (
    <div className={classes.NewGroupPage}>
      <h1>Repository > Product > Create Group</h1>
      <GroupForm method="post"/>
    </div>
  );
}

export default NewGroupPage;