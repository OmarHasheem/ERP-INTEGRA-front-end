import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation
} from 'react-router-dom';
import classes from './ProductForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';
import { useEffect, useState } from 'react';
import { useCategories, useSuppliers } from '../../../hooks/useApi';

const ProductForm = ({ method, product }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);

  // const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const supplierResponse = useSuppliers();
  const categoryResponse = useCategories();

  useEffect(() => {
    setCategories(categoryResponse);
  }, [categoryResponse]);

  useEffect(() => {
    setSuppliers(supplierResponse);
  }, [supplierResponse]);

  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <div className={classes.productForm}>
      <Form method={method} className={classes.form}>
        <p>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            required
            defaultValue={product ? product.name : ''}
          />
        </p>
        <p>
          <label htmlFor='price'>Price</label>
          <input
            id='price'
            type='number'
            name='price'
            required
            defaultValue={product ? product.price : ''}
          />
        </p>
        <p>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            name='description'
            required
            defaultValue={product ? product.description : ''}
          >
          </textarea>
        </p>
        <p>
          <label htmlFor='quantityInStock'>Quantity in stock</label>
          <input
            id='quantityInStock'
            type='number'
            name='quantityInStock'
            required
            min="0"
            defaultValue={product ? product.quantity_in_stock : ''}
          />
        </p>
        <p>
          <label htmlFor='categoryId'> Category </label>
          <select name='categoryId' id='categoryId'>
            <option value=''>--Choose an option--</option>
            {
              categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
          </select>
        </p>
        <p>
          <label htmlFor='supplierId'> Supplier </label>
          <select name='supplierId' id='supplierId'>
            <option value=''>--Choose an option--</option>
            {
              suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
              ))}
          </select>
        </p>
        <div className={classes.actions}>
          <button onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const productData = {
    name: data.get('name'),
    description: data.get('description'),
    price: data.get('price'),
    quantity_in_stock: data.get('quantityInStock'),
    supplier_id: data.get('supplierId'),
    category_id: data.get('categoryId')
  };

  let url;

  if (method === 'PUT') {
    url =
      'http://localhost:8000/repository/products/' + params.productId;
  } else {
    url = 'http://localhost:8000/repository/products';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer' + token
    },
    body: JSON.stringify(productData)
  });

  if (!response.ok) {
    throw json({ message: 'Could not save product.' }, { status: 500 });
  }

  const { product_id } = await response.json();

  return redirect('/repository/products/new/newDetail/' + product_id);
}
