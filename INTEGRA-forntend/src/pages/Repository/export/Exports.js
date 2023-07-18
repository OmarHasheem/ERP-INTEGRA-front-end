import { json, useLoaderData } from 'react-router-dom';
import ExportsList from '../../../components/Repository/export/ExportsList';
import { getAuthToken } from '../../../hooks/auth';
import './Exports.scss';
const ExportsPage = () => {
  const { data: exports } = useLoaderData();

  return (
    <div className="exports">
      <ExportsList exports={exports} />
    </div>
  );
};

export default ExportsPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/repository/exports', {
    headers: {
      Authorization: 'bearer ' + token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not fetch exports.' }, { status: 500 });
  } else {
    return response;
  }
}
