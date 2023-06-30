export default function FormInput(props: any) {
  const {
    validation,
    invalid = "false",
    dirty = "false",
    onTurnDiry,
    ...inputsProps
  } = props;

  function handleBlur() {
    onTurnDiry(props.name);
  }

  return (
    <input
      onBlur={handleBlur}
      {...inputsProps}
      data-invalid={invalid}
      data-diry={dirty}
    />
  );
}
