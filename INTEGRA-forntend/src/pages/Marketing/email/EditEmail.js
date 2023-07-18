import EmailForm from '../../../components/Marketing/email/EmailForm';
import { useRouteLoaderData } from 'react-router-dom';

const EditEmailPage = () => {
  const { data:email }= useRouteLoaderData('email-detail');

  return (
    <>
      <h1>Edit Page</h1>
      <EmailForm method="put"  email={email}/>
    </>
  );
};

export default EditEmailPage;
