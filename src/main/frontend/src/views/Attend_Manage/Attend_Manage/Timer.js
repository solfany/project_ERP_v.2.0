import React, { useState, useEffect } from 'react';
import './Timer.css';
import moment from 'moment';

const Timer = () => {
  const [time, setTime] = useState(moment());
  const currentDayOfWeek = time.day();
  const weekdayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const digit_to_name = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div id="clock" className="dark">
        <div className="display">
          <div className="weekdays">
            {weekdayNames.map((weekday, index) => (
              <span
                key={index}
                className={`weekday ${
                  currentDayOfWeek === index ? 'active' : ''
                }`}
              >
                {weekday}
              </span>
            ))}
          </div>
          <div className="ampm">{time.format('A')}</div>
          <div className="alarm"></div>
          <div className="digits">
            <div className={digit_to_name[time.format('hh')[0]]}>
              <span className="d1"></span>
              <span className="d2"></span>
              <span className="d3"></span>
              <span className="d4"></span>
              <span className="d5"></span>
              <span className="d6"></span>
              <span className="d7"></span>
            </div>
            <div className={digit_to_name[time.format('hh')[1]]}>
              <span className="d1"></span>
              <span className="d2"></span>
              <span className="d3"></span>
              <span className="d4"></span>
              <span className="d5"></span>
              <span className="d6"></span>
              <span className="d7"></span>
            </div>
            <div className="dots">
              <span className="d1"></span>
              <span className="d2"></span>
              <span className="d3"></span>
              <span className="d4"></span>
              <span className="d5"></span>
              <span className="d6"></span>
              <span className="d7"></span>
            </div>
            <div className={digit_to_name[time.format('mm')[0]]}>
              <span className="d1"></span>
              <span className="d2"></span>
              <span className="d3"></span>
              <span className="d4"></span>
              <span className="d5"></span>
              <span className="d6"></span>
              <span className="d7"></span>
            </div>
            <div className={digit_to_name[time.format('mm')[1]]}>
              <span className="d1"></span>
              <span className="d2"></span>
              <span className="d3"></span>
              <span className="d4"></span>
              <span className="d5"></span>
              <span className="d6"></span>
              <span className="d7"></span>
            </div>
            <div className="dots">
              <span className="d1"></span>
              <span className="d2"></span>
              <span className="d3"></span>
              <span className="d4"></span>
              <span className="d5"></span>
              <span className="d6"></span>
              <span className="d7"></span>
            </div>
            <div className={digit_to_name[time.format('ss')[0]]}>
              <span className="d1"></span>
              <span className="d2"></span>
              <span className="d3"></span>
              <span className="d4"></span>
              <span className="d5"></span>
              <span className="d6"></span>
              <span className="d7"></span>
            </div>
            <div className={digit_to_name[time.format('ss')[1]]}>
              <span className="d1"></span>
              <span className="d2"></span>
              <span className="d3"></span>
              <span className="d4"></span>
              <span className="d5"></span>
              <span className="d6"></span>
              <span className="d7"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
