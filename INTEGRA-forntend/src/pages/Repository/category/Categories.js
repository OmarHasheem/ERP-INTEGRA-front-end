import { json, useLoaderData } from 'react-router-dom';
import CategoriesList from '../../../components/Repository/category/CategoriesList';
import { getAuthToken } from '../../../hooks/auth';
import './Categories.scss';
const CategoriesPage = () => {
  const { data: categories } = useLoaderData();

  return (
    <div className="categories">
      <CategoriesList categories={categories} />
    </div>
  );
};

export default CategoriesPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/repository/categories', {
    headers: {
      Authorization: 'bearer' + token,
    },
  });



  if (!response.ok) {
    throw json({ message: 'Could not fetch categories.' }, { status: 500 });
  } else {
    return response;
  }
}
