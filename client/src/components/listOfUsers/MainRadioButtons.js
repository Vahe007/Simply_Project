import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function MainRadioButtons(props) {
  const { handleChange, labels, values, defaultValue } = props;

  return (
    <div>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleChange}
            defaultValue={defaultValue}
          >
            <FormControlLabel value={values[0]} control={<Radio />} label={labels[0]}/>
            <FormControlLabel value={values[1]} control={<Radio />} label={labels[1]} />
            <FormControlLabel value={values[2]} control={<Radio />} label={labels[2]} />
          </RadioGroup>
        </FormControl>
    </div>

   
  );
}