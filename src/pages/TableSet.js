import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

// https://mui.com/material-ui/react-text-field/#basic-textfield
function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      
      <TextField id="filled-basic" label="Filled" variant="filled" />
      
    </Box>
  );


}



function SelectBasic() {
  const handleChange = (event, newValue) => {
    alert(`You chose "${newValue}"`);
  };
  return (
    <Select defaultValue="dog" onChange={handleChange}>
      <Option value="dog">Dog</Option>
      <Option value="cat">Cat</Option>
      <Option value="fish">Fish</Option>
      <Option value="bird">Bird</Option>
    </Select>
  );
}

export default function TableSet() {
    return(
        <>
        <SelectBasic></SelectBasic>
        <BasicTextFields />
        </>
    );
}