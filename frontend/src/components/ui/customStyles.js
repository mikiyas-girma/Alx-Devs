export const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#333', // Dark background for the control
      color: 'white', // Text color
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#333', // Dark background for the dropdown menu
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#555' : '#333', // Different background for selected and normal options
      color: 'white', // Text color
      '&:hover': {
        backgroundColor: '#555', // Background for options on hover
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#555', // Background for selected values/tags
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white', // Text color for selected values/tags
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white', // Text color for the remove icon on selected values/tags
      '&:hover': {
        backgroundColor: '#777', // Background for the remove icon on hover
        color: 'white', // Text color for the remove icon on hover
      },
    }),
    input: (provided) => ({
      ...provided,
      color: 'white', // Ensures the text color is white for visibility
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#ccc', // Lighter text color for the placeholder for better visibility
    }),
  };
