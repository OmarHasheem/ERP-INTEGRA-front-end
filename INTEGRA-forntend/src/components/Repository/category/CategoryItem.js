import { Link, useSubmit } from 'react-router-dom';
import classes from './CategoryItem.module.scss';
import tableClasses from '../product/ProductsList.module.scss';
import { useEffect, useState } from 'react';
import { useProductsByCategory } from '../../../hooks/useApi';
import ProductsTable from '../product/UI/ProductsTable';
const CategoryItem = ({ category }) => {
  const [products, setProducts] = useState([]);
  const submit = useSubmit();

  const productResponse = useProductsByCategory(category.id);

  useEffect(() => {
    setProducts(productResponse);
  }, [productResponse]);

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?' +
      'Deleting a category will also delete all associated products');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  return (
    <div className={classes.categoryItem}>
      <h1>Repository > Categories > {category.name}</h1>
      <div className={classes.btn}>
      <button type="button"
        onClick={deleteHandler}>Delete Category
      </button>
      </div>
      <div className={tableClasses.productsList}>
        <ProductsTable products={products}/>
      </div>
    </div>
  );
};

export default CategoryItem;
