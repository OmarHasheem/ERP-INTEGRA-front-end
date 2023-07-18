import ExportForm from '../../../components/Repository/export/ExportForm';
import classes from './NewExport.module.scss'
const NewExportPage = () => {
  return (
    <div className={classes.NewExportPage}>
      <h1> Repository > Exports > Create New Export </h1>
      <ExportForm method="post" />
    </div>
  );
};

export default NewExportPage;
