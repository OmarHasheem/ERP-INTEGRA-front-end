import { Link, redirect, useNavigate } from 'react-router-dom';
import classes from './ProductsList.module.scss';
import ProductsTable from './UI/ProductsTable';
const ProductsList = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.productsList}>
      <div className={classes.add_product}>
        <Link
          className={classes.add_product_link}
          to="/repository/products/new"
        >
          Add New Product
        </Link>
      </div>
      <ProductsTable products={products} />
    </div>
  );
};

export default ProductsList;
