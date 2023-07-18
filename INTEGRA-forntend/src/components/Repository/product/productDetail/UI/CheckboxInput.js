const CheckboxInput = ({ props }) => {
  return (
    props.values.map((value) => {
      return (
        <input
          key={value}
          id={props.name}
          type={props.type}
          name={value}
        />

      );
    }));
};

export default CheckboxInput;