import ProductDetailNewForm from '../../../../components/Repository/product/productDetail/ProductDetailNewForm';
import classes from './NewProductDetail.module.scss'
const NewProductDetailPage = () => {
  return (
    <div className={classes.NewProductDetailPage}>
      <h1>Repository > Product > Create Product Detail</h1>
      <ProductDetailNewForm method="post"/>
    </div>
  );
}

export default NewProductDetailPage;