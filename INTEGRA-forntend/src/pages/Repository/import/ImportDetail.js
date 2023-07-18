import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import ImportItem from '../../../components/Repository/import/ImportItem';
import { getAuthToken } from '../../../hooks/auth';

const ImportDetailPage = () => {
  const { data } = useRouteLoaderData('import-detail');
  return <ImportItem importItem={data} />;
};

export default ImportDetailPage;

export async function loader({ request, params }) {
  const id = params.importId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/repository/imports/' + id,
    {
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected imports' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action({ request, params }) {
  const id = params.importId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/repository/imports/' + id, {
      method: request.method,
      headers: {
        Authorization: 'bearer' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw json({ message: 'Could not delete Import.' }, { status: 500 });
  }

  return redirect('/repository/imports');
}
