import React, {useState, useEffect} from 'react';

function Time() {
    const [date, setDate] = useState (new Date())
  
    useEffect(() => {
      setInterval(() => {
        setDate(new Date())
      }, 1000);
     
    });
  
    return (
      <div>
          Текущее время {date.toLocaleTimeString()}
      </div>
    )
  }

  export default Time;