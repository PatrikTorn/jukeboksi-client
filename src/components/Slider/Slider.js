import React from 'react';
import Slider from 'rc-slider';
import './Slider.css';

export const VolumeSlider = ({onChange, value}) => (
  <Slider value={value} onChange={onChange} />
);
