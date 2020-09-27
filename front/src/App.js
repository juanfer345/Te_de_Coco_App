import React, {useState} from 'react';
import './App.css';
import {UploadFile} from "./Logic/UploadFile";
import {Program} from './Logic/Program';

export const App = () => {
  const [elements, setElements] = useState(null)

  const onElementsParsed = (elements) => {
    setElements(elements)
  }

  const jsxUploadElements = (
    <div>
      <UploadFile onElementsParsed = {onElementsParsed}/>
    </div> 
  )

  if (!elements) {
    return jsxUploadElements;
  } 
  else {
    return (
      <div>
        <Program elements = {elements}/>
      </div>
    )
  }
}

export default App; 