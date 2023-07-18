import { Fragment } from 'react';
import { json, useLoaderData } from 'react-router-dom';
import { getAuthToken } from '../../hooks/auth';
import PDFsList from '../../components/PDF/PDFsList';
import classes from './pdfs.module.scss';
const PDFsPage = () => {
  const { data: pdfs } = useLoaderData();

  return (
    <div className={classes.pdfs}>
      <PDFsList pdfs={pdfs} />
    </div>
  );
};

export default PDFsPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/pdfs', {
    headers: {
      Authorization: 'bearer ' + token,
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not fetch pdfs.' }, { status: 500 });
  } else {
    return response;
  }
}
