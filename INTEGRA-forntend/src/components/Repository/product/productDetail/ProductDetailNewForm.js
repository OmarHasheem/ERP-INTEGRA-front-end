import { getAuthToken } from '../../../../hooks/auth';
import { Form, json, redirect, useNavigate, useNavigation, useParams } from 'react-router-dom';
import classes from './ProductDetailNewForm.module.scss';
import { useEffect, useState } from 'react';
import { useAttributesGroup, useGroups, useProductStock } from '../../../../hooks/useApi';
import Input from './UI/Input';
import CheckboxInput from './UI/CheckboxInput';
import { Select } from '@mui/material';
import SelectInput from './UI/SelectInput';
import TextAreaInput from './UI/TextAreaInput';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Wrapper from './Helpers/Wrapper';
import { Card } from '@mui/material';

const ProductDetailNewForm = ({ method, attribute }) => {
  const [groups, setGroups] = useState([]);
  const [attributesGroup, setAttributesGroup] = useState([]);
  const [numOfDetail, setNumOfDetail] = useState([0]);
  const [stockSum, setStockSum] = useState(0);
  const [stock, setStock] = useState([]);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [idOfGroup, setIdOfGroup] = useState(0);
  const [productStock, setProductStock] = useState(0);


  const { productId } = useParams('productId');

  // const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const groupResponse = useGroups();
  const productStockResponse = useProductStock(productId);

  useEffect(() => {
    setProductStock(productStockResponse);
  }, [productStockResponse]);

  useEffect(() => {
    setGroups(groupResponse);
  }, [groupResponse]);

  const cancelHandler = () => {
    navigate(-1);
  };

  const choseGroupHandler = (event) => {
    const id = event.target.value;
    setIdOfGroup(id);

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch('http://localhost:8000/repository/products/attributeGroups/attributesOfGroup/' + idOfGroup, {
          headers: {
            'Authorization': 'bearer ' + token
          }
        });

        const data = await response.json();

        if (response.ok) {
          setAttributesGroup(data.data);
        } else {
          throw json({ message: 'Could not fetch Attributes of Group.' }, { status: 500 });
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (idOfGroup > 0)
      fetchData();
  }, [idOfGroup]);

  const getMaxStock = (event) => {
    const { value, id } = event.target;
    const parsedId = parseInt(id);

    setStock((prevStock) => {
      const updatedStock = [...prevStock];
      updatedStock[parsedId] = parseInt(value);
      return updatedStock;
    });
  };

  useEffect(() => {
    const sum = stock.reduce((sum, element) => sum + element, 0);
    setStockSum(sum);
  }, [stock]);

  useEffect(() => {
    if (stockSum > productStock) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [stockSum]);


  const generateArray = (num) => {
    const arr = [];
    for (let i = 0; i < num; i++) {
      arr[i] = i;
    }
    return arr;
  };

  const addValueHandler = () => {
    const value = generateArray(numOfDetail.length + 1);
    setNumOfDetail(value);
  };

  const removeValueHandler = () => {
    const value = generateArray(numOfDetail.length - 1);
    setNumOfDetail(value);
  };

  return (
    <div className={classes.productDetailForm}>
      <div className={classes.group}>
        <Card className={classes.card}>
          <label htmlFor='group'> Choose Group </label>

          <select id='group' name='type' onChange={choseGroupHandler}>
            <option value=''>--Choose an option--</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>{group.name}</option>
            ))}
          </select>

          <div className={classes.iconBox}>
            <RemoveIcon className={classes.addIcon} onClick={removeValueHandler} />
            <AddIcon className={classes.addIcon} onClick={addValueHandler} />
          </div>

        </Card>
      </div>
      <div>
        <Form method={method} className={classes.form}>

            <Card className={classes.card}>
              <table>
              <thead>
              <tr>
                <th style={{'font-size':'25px'}}>stock</th>
                {
                  attributesGroup.map((attribute) => (
                    <th key={attribute.id} style={{'font-size':'25px'}}>{attribute.name}</th>
                  ))
                }
              </tr>
              </thead>
              <tbody>
              {numOfDetail.map((num) => (
              <tr key={num}>
                <Card className={classes.card} style={{'marginTop': '10px'}}>
                  <label>Stock</label>
                <td><input type='number' name='stock' onChange={getMaxStock} required id={num} min='0' /></td>
                  {
                  attributesGroup.map((attribute) => (
                    <Wrapper key={attribute.id}>
                      {<label>{attribute.name}</label>}
                      {attribute.type == 'select' && <td><SelectInput props={attribute} key={attribute.id} /></td>}
                      {attribute.type == 'checkbox' && <td><CheckboxInput props={attribute} key={attribute.id} /></td>}
                      {attribute.type == 'radio' && <td><CheckboxInput props={attribute} key={attribute.id} /></td>}
                      {attribute.type == 'textArea' && <td><TextAreaInput props={attribute} key={attribute.id} /></td>}
                      {attribute.type == 'text' && <td><Input props={attribute} key={attribute.id} /></td>}
                      {attribute.type == 'number' && <td><Input props={attribute} key={attribute.id} /></td>}
                      {attribute.type == 'date' && <td><Input props={attribute} key={attribute.id} /></td>}
                      {attribute.type == 'time' && <td><Input props={attribute} key={attribute.id} /></td>}
                      {attribute.type == 'date-time' && <td><Input props={attribute} key={attribute.id} /></td>}
                    </Wrapper>
                  ))
                }
                <td><input type='hidden' name='productId' value={productId} /></td>
                <td><input type='hidden' name='groupId' value={idOfGroup} /></td>
                </Card>
              </tr>
              ))}
              </tbody>
              </table>
            </Card>

          <div className={classes.actions}>
            <button onClick={cancelHandler} disabled={isSubmitting}>
              Cancel
            </button>
            {disableSubmit && <p>The number of stock of all details {stockSum} and the number of stock of product is
              smaller {productStock}</p>}
            <button disabled={isSubmitting || disableSubmit}>
              {isSubmitting ? 'Submitting...' : 'Save'}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProductDetailNewForm;

export async function action({ request, params }) {
  const formData = await request.formData();
  const token = getAuthToken();
  const method = request.method;
  const productId = params.productId;

  const attributeData = {};
  //let attributeData = [];

  let currentGroup = 1;
  let currentAttributes = {};

  for (let pair of formData.entries()) {
    const [fieldName, fieldValue] = pair;

    if (Object.keys(currentAttributes).includes(fieldName)) {
      attributeData[`group${currentGroup}`] = currentAttributes;
      // attributeData = attributeData.concat(currentAttributes);
      currentGroup++;
      currentAttributes = {};
    }

    if (fieldName.includes('name')) {
      currentAttributes.name = fieldValue;
    } else if (fieldName.includes('value')) {
      attributeData[`group${currentGroup}`] = currentAttributes;
      currentAttributes = { name: fieldValue };
      currentGroup++;
    } else {
      const attributeName = fieldName.split('_')[0];
      currentAttributes[attributeName] = fieldValue;
    }
  }

  if (Object.keys(currentAttributes).length > 0) {
    attributeData[`group${currentGroup}`] = currentAttributes;
  }


  const details = {
    details: attributeData
  };

  const response = await fetch('http://localhost:8000/repository/productDetails', {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: 'bearer' + token
    },
    body: JSON.stringify(details)
  });

  if (!response.ok) {
    throw json({ message: 'Could not save Details of Product.' }, { status: 500 });
  }

  return redirect(`/repository/products/product-detail/${productId}`);
}