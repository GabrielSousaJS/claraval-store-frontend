export default function FormInput(props: any) {
  const {
    validation,
    invalid = "false",
    dirty = "false",
    onTurnDirty,
    ...inputsProps
  } = props;

  function handleBlur() {
    onTurnDirty(props.name);
  }

  return (
    <input
      onBlur={handleBlur}
      {...inputsProps}
      data-invalid={invalid}
      data-dirty={dirty}
    />
  );
}
