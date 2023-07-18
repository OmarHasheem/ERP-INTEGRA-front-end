import TVForm from '../../../components/Marketing/tv/TVForm';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './editTv.module.scss';

const EditTVPage = () => {
  const tv = useRouteLoaderData('tv-detail');

  return (
    <div className={classes.editTv}>
      <h1> Marketing > TV > Edit {tv.data.channel} </h1>
      <TVForm method="put" tv={tv.data} />
    </div>
  );
};

export default EditTVPage;
