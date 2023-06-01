import React, { useState } from 'react';
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const Calender = () => {
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ]);
    return (
        <div>
            <DateRange
  editableDateInputs={true}
  onChange={item => setState([item.selection])}
  moveRangeOnFirstSelection={false}
  rangeColors={['#262626']}
  ranges={state}
/>
        </div>
    );
};

export default Calender;