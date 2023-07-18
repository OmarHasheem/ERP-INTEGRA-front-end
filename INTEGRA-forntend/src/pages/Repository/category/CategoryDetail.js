import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import CategoryItem from '../../../components/Repository/category/CategoryItem';
import { getAuthToken } from '../../../hooks/auth';

const CategoryDetailPage = () => {
  const { data } = useRouteLoaderData('category-detail');

  return <CategoryItem category={data} />;
};

export default CategoryDetailPage;

export async function loader({ request, params }) {
  const id = params.categoryId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/repository/categories/' + id,
    {
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected category' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action({ request, params }) {
  const id = params.categoryId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/repository/categories/' + id,
    {
      method: request.method,
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json({ message: 'Could not delete Category.' }, { status: 500 });
  }

  return redirect('/repository/categories');
}
