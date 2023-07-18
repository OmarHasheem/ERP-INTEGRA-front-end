import ExportForm from '../../../components/Repository/export/ExportForm';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './EditExport.module.scss'
const EditExportPage = () => {
  const { data } = useRouteLoaderData('export-detail');

  return (
    <div className={classes.EditExportPage}>
      <h1> Repository > Exports > Edit {data.name} </h1>
      <ExportForm method="put" exportItem={data} />
    </div>
  );
};

export default EditExportPage;
