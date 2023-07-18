import { useNavigate } from 'react-router-dom';

const ProductsTable = ({products}) => {
  const navigate = useNavigate();
  return (<table>
    <thead>
    <tr>
      <th>Product Id</th>
      <th>Name</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Category Id</th>
      <th>Supplier ID</th>
    </tr>
    </thead>
    <tbody>
    {products.map((product) => (
      <tr
        key={product.id}
        onClick={() =>
          navigate(`/repository/products/product-detail/${product.id}`)
        }
      >
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.quantity_in_stock}</td>
        <td>{product.category_id}</td>
        <td>{product.supplier_id}</td>
      </tr>
    ))}
    </tbody>
    <tfoot>
    <tr>
      <th>Product Id</th>
      <th>Name</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Category Id</th>
      <th>Supplier ID</th>
    </tr>
    </tfoot>
  </table>
  );
};

export default ProductsTable;

