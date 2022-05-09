import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
 
 export const RangeSlide = (props) => {
 
  const [ value, setValue ] = useState(1500); 
 
  return (
    <RangeSlider
      value={props.value}
      onChange={changeEvent => setValue(changeEvent.target.value)}
      min={900}
      max={1700}
      tooltip={'on'}
    />
  );
 
};


