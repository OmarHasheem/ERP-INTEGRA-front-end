import ProductForm from '../../../components/Repository/product/ProductForm';
import classes from './NewProduct.module.scss';
const NewProductPage = () => {
  return(
    <div className={classes.newProduct}>
      <h1>Repository > Products > Create New Product</h1>
      <ProductForm method="post" />
    </div>
    );
};

export default NewProductPage;
