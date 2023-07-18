import { json, useLoaderData } from 'react-router-dom';
import ImportsList from '../../../components/Repository/import/ImportsList';
import { getAuthToken } from '../../../hooks/auth';
import './Imports.scss';
const ImportsPage = () => {
  const { data: imports } = useLoaderData();

  return (
    <div className="imports">
      <ImportsList imports={imports} />
    </div>
  );
};

export default ImportsPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/repository/imports', {
    headers: {
      Authorization: 'bearer ' + token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not fetch imports.' }, { status: 500 });
  } else {
    return response;
  }
}
