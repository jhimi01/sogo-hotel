import React, { useState } from 'react';
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const Calender = ({value, handleSelect}) => {
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ]);
    return (
       
            <DateRange
  editableDateInputs={true}
  onChange={handleSelect}
  date={value.startDate}
  moveRangeOnFirstSelection={false}
  rangeColors={['#262626']}
  ranges={[value]}
  minDate={value.startDate}
  maxDate={value.endDate}/>
       
    );
};

export default Calender;