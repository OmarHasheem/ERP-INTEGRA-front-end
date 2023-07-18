import { Card } from '@mui/material';

const AttributeCard = ({attribute}) => {
  return (
    <div>
      <Card variant="outlined">
        <p>{attribute.id}</p>
        <p>{attribute.name}</p>
        <p>{attribute.type}</p>
        <p>{attribute.group_id}</p>
      </Card>
    </div>
  );
}

export default AttributeCard;