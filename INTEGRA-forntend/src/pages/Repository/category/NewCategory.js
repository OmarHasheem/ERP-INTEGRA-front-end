import CategoryForm from '../../../components/Repository/category/CategoryForm';
import classes from './NewCategory.module.scss'
const NewCategoryPage = () => {
  return (
    <div className={classes.NewCategoryPage}>
      <h1>Repository > Categories > Create New Category</h1>
      <CategoryForm method="post" />
    </div>
  );
};

export default NewCategoryPage;
