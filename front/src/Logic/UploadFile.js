import React from 'react';
import {classifyElements} from "../Util/Clasificador";
const parseXml2Json = require('xml2js').parseString;

export const UploadFile = ({onElementsParsed}) => {
  const fileReader = new FileReader();

  const onFileChange = async (e) => {
    e.preventDefault();
    fileReader.onload = (e) => {
      const uploadedFile = e.target.result;
      parseXml2Json(uploadedFile, (e, result) => {
        if(e){console.log(e.message); return;}
        classifyElements(result)
          .then((result)=>onElementsParsed(result))
          .catch((e)=>{})
      })
    }
    fileReader.readAsText(e.target.files[0]);
  };

  return (
    <div>
      <h1>
        Welcome
      </h1>
      <h3>
        Sube tu diagrama preconceptual!
      </h3>
      <div>
        <input
          type="file"
          onChange={onFileChange}
          accept='text/xml'
        />
      </div>
    </div>
  );
}
