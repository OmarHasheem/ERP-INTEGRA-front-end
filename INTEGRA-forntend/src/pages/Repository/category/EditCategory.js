import CategoryForm from '../../../components/Repository/category/CategoryForm';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './EditCategory.module.scss'
const EditCategoryPage = () => {
  const { data: category } = useRouteLoaderData('category-detail');

  return (
    <div className={classes.EditCategoryPage}>
      <h1> Repository > Categories > Edit {category.name} </h1>
      <CategoryForm method="put" category={category} />
    </div>
  );
};

export default EditCategoryPage;
