const Input = ({ props, value} ) => {
  return (
      <input
        id={props.name}
        type={props.type}
        name={props.name}
        required
        defaultValue={value ? value : ''}
      />
  );
};

export default Input;