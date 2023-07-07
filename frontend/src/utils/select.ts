export const selectStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: '40px',
      border: 'none',
      boxShadow: 'none',
      '&:hover': {
        border: 'none',
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#9e9e9e',
    }),
    option: (provided: any) => ({
      ...provided,
      color: 'var(--text-color)',
    }),
  };
  