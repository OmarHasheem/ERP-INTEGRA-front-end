import ImportForm from '../../../components/Repository/import/ImportForm';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './EditImport.module.scss'
const EditImportPage = () => {
  const { data } = useRouteLoaderData('import-detail');

  return (
    <div className={classes.EditImportPage}>
      <h1> Repository > Imports > Edit {data.name} </h1>
      <ImportForm method="put" importItem={data} />
    </div>
  );
};

export default EditImportPage;
