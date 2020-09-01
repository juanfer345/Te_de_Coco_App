import React from 'react';


import {extractElemsOfDiagram} from "../Util/Parser";
const parseXml2Json = require('xml2js').parseString;


export const UploadFile = () => {

  const onFileChange = async (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const uploadedFile = e.target.result;
      parseXml2Json(uploadedFile, (e, result) => {
        if(e){console.log(e.message); return;}
        extractElemsOfDiagram(result.mxfile.diagram[0].mxGraphModel[0].root[0].mxCell);
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
