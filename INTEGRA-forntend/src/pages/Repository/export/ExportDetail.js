import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import ExportItem from '../../../components/Repository/export/ExportItem';
import { getAuthToken } from '../../../hooks/auth';

const ExportDetailPage = () => {
  const { data } = useRouteLoaderData('export-detail');
  return <ExportItem exportItem={data} />;
};

export default ExportDetailPage;

export async function loader({ request, params }) {
  const id = params.exportId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/repository/exports/' + id, {
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected exports' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action({ request, params }) {
  const id = params.exportId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/repository/exports/' + id, {
      method: request.method,
      headers: {
        Authorization: 'bearer' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw json({ message: 'Could not delete Export.' }, { status: 500 });
  }

  return redirect('/repository/exports');
}
