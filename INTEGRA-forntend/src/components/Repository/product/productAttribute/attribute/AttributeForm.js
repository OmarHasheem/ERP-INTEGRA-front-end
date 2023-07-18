import { getAuthToken } from '../../../../../hooks/auth';
import { Form, json, redirect, useNavigate, useNavigation } from 'react-router-dom';
import classes from './AttributeForm.module.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';

const AttributeForm = ({method, attribute}) => {
  const [numberOfValues, setNumberOfValues] = useState([]);
  const [inputType, setInputType] = useState(false);
  // const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const generateArray = (num) => {
    const arr = [];
    for (let i = 0; i < num; i ++) {
      arr[i] = i;
    }
    return arr;
  };

  const cancelHandler = () => {
    navigate(-1);
  };

  const addValueHandler = () => {
    var value = generateArray(numberOfValues.length + 1);
    setNumberOfValues(value);
  };

  const removeValueHandler = () => {
    var value = generateArray(numberOfValues.length - 1);
    setNumberOfValues(value);
  };

  const choseInputType = (event) => {
    if(event.target.value == "select") {
      setInputType(true);
    } else {
      setInputType(false);
    }
  }

  return (
    <div className={classes.attributeForm}>
      <Form method={method} className={classes.form}>
        <label htmlFor="name">Name Of Attribute:</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={attribute ? attribute.name : ''}
        />
        <label htmlFor="type">Type Of Attribute:</label>
        <select name="type" onChange={choseInputType}>
          <option value="">--Choose an option--</option>
          <option value="select">Select</option>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
        </select>

        {inputType && <RemoveIcon className={classes.addIcon} onClick={removeValueHandler}/>}
        {inputType && <AddIcon className={classes.addIcon} onClick={addValueHandler}/>}
        {inputType && numberOfValues.map((value)=>(
          <div key={value}>
          <label htmlFor={value}>Value Of Attribute:</label>
          <input
          id={value}
          type="text"
          name="values"
          required
          defaultValue={attribute ? attribute.name : ''}
          />
          </div>
          ))
        }
        <div className={classes.actions}>
          <button onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </Form>
    </div>
  )
}

export default AttributeForm;


export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const attributeData = {
    name: data.get('name'),
    type: data.get('type'),
    group_id: params.groupId,
  };

  if(data.getAll('values').length > 0) {
    attributeData.values = {...data.getAll('values')};
  }

  let url;

  if (method === 'PUT') {
    url =
      'http://localhost:8000/repository/products/attributes/' + params.attributeId;
  } else {
    url = 'http://localhost:8000/repository/products/attributes';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: 'bearer' + token,
    },
    body: JSON.stringify(attributeData),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save attribute.' }, { status: 500 });
  }

  return redirect('/repository/products/attributes/groups');
}
