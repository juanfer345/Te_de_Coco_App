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

        if (e) {console.log(e.message); return;}
        classifyElements(result)
          .then((result) => onElementsParsed(result))
          .catch((e) => {})
      })
    }
    fileReader.readAsText(e.target.files[0]);
  };

  return (
    <div>
      <div style = 
          {{
            width: '60%',
            marginTop:'20px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
        <h1 style = 
          {{
            textAlign: "center"
          }}>
          Bienvenido
        </h1>
        <h3>
          Por favor, sube tu esquema preconceptual!
        </h3>
        <div>
          <input
            type = "file"
            onChange = {onFileChange}
            accept = 'text/xml'
          />
        </div>
      </div>
    </div>
  );
}