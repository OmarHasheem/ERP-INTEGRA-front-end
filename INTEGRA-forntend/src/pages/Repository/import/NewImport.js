import ImportForm from '../../../components/Repository/import/ImportForm';
import classes from './NewImport.module.scss'
const NewImportPage = () => {
  return (
    <div className={classes.NewImportPage}>
      <h1> Repository > Imports > Create New Import </h1>
      <ImportForm method="post" />
    </div>
  );
};

export default NewImportPage;
