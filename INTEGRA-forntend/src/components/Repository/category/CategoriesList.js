import { Link, redirect, useNavigate } from 'react-router-dom';
import classes from './CategoriesList.module.scss';
const CategoriesList = ({ categories }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.categoriesList}>
      <h1> Repository > Categories </h1>
      <div className={classes.add_category}>
        <Link
          className={classes.add_category_link}
          to="/repository/categories/new"
        >
          Add New Category
        </Link>
      </div>
      <table>
        <thead>
        <tr>
          <th>Category Id</th>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {categories.map((category) => (
          <tr
            key={category.id}
            onClick={() =>
              navigate(`/repository/categories/category-detail/${category.id}`)
            }
          >
            <td>{category.id}</td>
            <td>{category.name}</td>
          </tr>
        ))}
        </tbody>
        <tfoot>
        <tr>
          <th>Category Id</th>
          <th>Name</th>
        </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CategoriesList;
