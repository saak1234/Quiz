import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectAutoWidth() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 390 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
          label="Language"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>English</MenuItem>
          <MenuItem value={21}>Hindi</MenuItem>
          <MenuItem value={22}>Bengali</MenuItem>
          <MenuItem value={22}>Gujarati</MenuItem>
          <MenuItem value={22}>Marathi</MenuItem>
          <MenuItem value={22}>Tamil</MenuItem>
          <MenuItem value={22}>Telugu</MenuItem>
          <MenuItem value={22}>Punjabi</MenuItem>
          <MenuItem value={22}>Kannada</MenuItem>
          <MenuItem value={22}>Malayalam</MenuItem>
          <MenuItem value={22}>Urdu</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}