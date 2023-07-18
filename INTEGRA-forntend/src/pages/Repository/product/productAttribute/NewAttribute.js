import AttributeForm from '../../../../components/Repository/product/productAttribute/attribute/AttributeForm';
import classes from './NewAttribute.module.scss'
const NewAttributePage = () => {
  return (
    <div className={classes.NewAttributePage}>
      <h1>Repository > Product > Create Attribute</h1>
      <AttributeForm method="post"/>
    </div>
  );
}

export default NewAttributePage;