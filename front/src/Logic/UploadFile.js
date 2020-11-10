import React from 'react';
import { classifyElements } from "../Util/Clasificador";
const parseXml2Json = require('xml2js').parseString;

export const UploadFile = ({ onElementsParsed }) => {
  const fileReader = new FileReader();

  const onFileChange = async (e) => {

    e.preventDefault();

    fileReader.onload = (e) => {
      const uploadedFile = e.target.result;
      parseXml2Json(uploadedFile, (e, result) => {

        if (e) { console.log(e.message); return; }
        classifyElements(result)
          .then((result) => onElementsParsed(result))
          .catch((e) => { })
      })
    }
    fileReader.readAsText(e.target.files[0]);
  };

  return (
    <div className='container'>
      <div className='container mt-5 align-self-center'>
        <div className='container-fluid'>
          <div className='row d-flex justify-content-center'>
            <div className='h1 '>
              Bienvenido
            </div>
          </div>
        </div>
        <div className='container-fluid mt-3'>
          <div className='row d-flex justify-content-center'>
            <div className='h3'>
              Por favor, sube tu esquema
            </div>
          </div>
        </div>
        <div className='container-fluid'>
          <div className='row d-flex justify-content-center'>
            <div>
              <label className='btn btn-primary' htmlFor='subirArchivo'>
                Seleccionar Archivo
                <input
                  id='subirArchivo'
                  className='d-none'
                  type="file"
                  onChange={onFileChange}
                  accept='text/xml'
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}