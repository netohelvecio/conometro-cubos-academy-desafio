import React, { useEffect, useState } from 'react';

let countdownTimeout: NodeJS.Timeout;

function App() {
  const [time, setTime] = useState(3590);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      countdownTimeout = setTimeout(() => setTime(currTime => currTime + 1), 1000)
    }
  }, [time, isActive])

  function formatTime(timeValue: number) {
    const hours = Math.floor(timeValue / 3600);
    const minutes = Math.floor(timeValue % 3600 / 60);
    const seconds = timeValue % 60;

    return {hours, minutes, seconds }
  }

  function formatTwoDigits(number: number) {
    const formattedNumber = number.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });

    return formattedNumber;
  }

  function startTime() {
    setIsActive(true);
  }

  function pauseTime() {
    setIsActive(false);
    clearTimeout(countdownTimeout);
  }

  function finishTime() {
    setIsActive(false);
    setTime(0);
    clearTimeout(countdownTimeout);
  }

  function resetTime() {
    setTime(0);
    clearTimeout(countdownTimeout);
  }

  const { minutes, seconds, hours } = formatTime(time);

  return (
    <div style={{ display: 'grid', gap: '10px', gridRow: 10, width: '300px' }}>
      {formatTwoDigits(hours)}:{formatTwoDigits(minutes)}:{formatTwoDigits(seconds)}

      <button onClick={startTime}>Começar</button>
      <button onClick={pauseTime}>Pausar</button>
      <button onClick={finishTime}>Finalizar cronometro</button>
      <button onClick={resetTime}>Reiniciar cronometro</button>
    </div>
  );
}

export default App;
