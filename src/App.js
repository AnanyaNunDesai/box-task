import React, { useEffect, useState } from 'react';
import './App.css';
import Box from './components/Box';

function App() {
  const [boxNum, setBoxNum] = useState(0);
  const [renderedBoxes, setRenderedBoxes] = useState([]);

  useEffect(() => {
    function handleResizing() {
      let resizeTimer = setTimeout(() => {
        const newBox = (<Box key={renderedBoxes.length}/>);
        setRenderedBoxes([...renderedBoxes, newBox]);
      }, 3000);

      return () => {
        window.removeEventListener('resize', handleResizing);
        clearTimeout(resizeTimer);
      }
    }

    window.addEventListener('resize', handleResizing);
  }, [renderedBoxes]);

  const submitHandler = (event) => {
    event.preventDefault();
    renderBoxes();
  };

  const boxNumHandler = (event) => {
    setBoxNum(parseInt(event.target.value, 10));
  };

  const renderBoxes = () => {
    const boxes = [];
    for (let i = 0; i < boxNum; i++) {
      boxes.push(<Box key={i} />);
    }
    setRenderedBoxes(boxes);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="boxNumInput">Number of boxes</label>
        <input
          type="number"
          id="boxNumInput"
          value={boxNum}
          onChange={boxNumHandler}
        />
        <button type="submit">Enter</button>
      </form>
      <div className="box-list">
        {renderedBoxes}
      </div>
    </div>
  );
}

export default App;