import React,{Component} from 'react';
import './App.css';

class App extends Component { 

  state = { 
  selectedFile: null,
  diagram: null
  }; 
  
  // On file select (from the pop up) 
  onFileChange = event => { 
    // Update the state 
  this.setState({ selectedFile: event.target.files[0] }); 
  //this.state.selectedFile=event.target.files[0];
  }; 
  extractObjOfDiagram = () =>{
    if(this.state.diagram){
      var regexActor = /\w*Actor\W{1}/;
      var regexRelDinamic=/e\w*\W{1}\w*\W{1}wrap/;
      var regexConcepto= /r\w*\W{1}0\W\w*\W{1}wrap/;
      var regexRelEstruct=/f\w*\W\w{7}/;
      //Relaciones o flechas que unen los diferentes elementos del diagrama
      var regexRelaciones=/ed\w{7}\W{1}\w*/;
      
      var i=0;
      var aux,concepto,actor;
      var relaciones=[];
      var conceptosPadre=[];
      var atributos={};
      var conceptosDinamicos={};
      var actores={};
      let relacionesDinamicas=[];
      var diagram=this.state.diagram;

      diagram.forEach(obj=>{
          if(obj.$.id==0 || obj.$.id==1){
            return null;
          }
          else if(regexActor.test(obj.$.style)){
            diagram[obj.$.id].$.style='actor';
            console.log("Se encontro un actor",obj.$.value);
          }
          else if (regexRelDinamic.test(obj.$.style)) {
            diagram[obj.$.id].$.style='relDinamica';
           //console.log("Se encontro una relacion dinamica",obj.$); 
          }
          else if (regexConcepto.test(obj.$.style)) {
            diagram[obj.$.id].$.style='concepto';
           //console.log("Se encontro un concepto",obj.$); 
          }
          else if(regexRelEstruct.test(obj.$.style)){
            diagram[obj.$.id].$.style='relEstructural';
            //console.log("Se encontro una relacion estructural",obj.$);
          }

          else if(regexRelaciones.test(obj.$.style)){
            var source=obj.$.source;
            var target=obj.$.target;
            relaciones[i]={sourc:source,targ:target};
            i++;
          }
          else{
            alert('Se detecto un elemento desconocido: '+obj.$.value);
            
          }   
      });
      //RELACIONES-------------------
      i=0;
      relaciones.forEach(rel=>{
        var idSource=rel.sourc;
        var idTarget=rel.targ;
        //Identificación de conceptos padre
        if(diagram[idTarget].$.style=='relEstructural' && diagram[idSource].$.style=='concepto'){
          conceptosPadre[i]={concepto:diagram[idSource].$.value, tiene: idTarget};
          //console.log(conceptosPadre[i]);
          i++;
        }
        //Indetificación de atributos
        if(diagram[idSource].$.style=='relEstructural' && diagram[idTarget].$.style=='concepto'){
          aux=atributos[idSource];
          if(aux){
            atributos[idSource]=aux+','+diagram[idTarget].$.value;
          }
          else{
           atributos[idSource]=diagram[idTarget].$.value; 
          } 
        }
        //Indetificación de acciones sobre conceptos
        if(diagram[idSource].$.style=='relDinamica' && diagram[idTarget].$.style=='concepto'){
          aux=conceptosDinamicos[diagram[idTarget].$.value];
          if(aux){
            conceptosDinamicos[diagram[idTarget].$.value]=aux+','+idSource;
          }
          else{
            conceptosDinamicos[diagram[idTarget].$.value]=idSource;
          }
        }
        //Indetificación de actores  y las acciones que realizan
        if(diagram[idTarget].$.style=='relDinamica' && diagram[idSource].$.style=='actor'){
          aux=actores[diagram[idSource].$.value];
          if(aux){
            actores[diagram[idSource].$.value]=aux+','+idTarget;
          }
          else{
            actores[diagram[idSource].$.value]=idTarget;
          }
        }
      });
      console.log('----Relaciones dinamicas')
      let acciones=[];
      let accionesDeActores;
      //Recorrer las acciones que se aplican sobre cada concepto
      i=0;
      for (concepto in conceptosDinamicos){
        acciones=conceptosDinamicos[concepto].split(",");
        accionesDeActores={};
        acciones.forEach(accion=>{
          //Buscar que actor realiza dicha acción
          for (actor in actores){
            if(actores[actor].includes(accion)){
              aux=accionesDeActores[actor];
              if(aux){
                accionesDeActores[actor]=aux+','+diagram[accion].$.value;
              }
              else{
                accionesDeActores[actor]=diagram[accion].$.value;  
              }
            }
          }
        });
        relacionesDinamicas[i]={concepto: concepto, permisos:accionesDeActores};
        console.log(relacionesDinamicas[i])
        i++;
      };
      console.log("---- Objetos compuestos identificados:");
      conceptosPadre.forEach(obj=>{
        obj.tiene=atributos[obj.tiene].split(",");
        console.log(obj.concepto+': '+obj.tiene);
      });

    }
  };
  // On file upload (click the upload button) 
  onFileUpload = () => { 
    let fileReader;
    let contentJSON;

    var setDiagram = () =>{      
      this.setState({ diagram: contentJSON });
      this.extractObjOfDiagram();
    }
    var handleFileRead = () =>{
      const content=fileReader.result;
      //console.log('Este es el primer resultado:',content);
      var parseXml2Json = require('xml2js').parseString;
      parseXml2Json(content, function (error, result) {
          if(error){
            alert("Error upload file");
          }
          else{
            contentJSON=result.mxfile.diagram[0].mxGraphModel[0].root[0].mxCell;
            //console.log('Elementos:',contentJSON)
            setDiagram();
          }
      });
    }

    var file=this.state.selectedFile;
    if(file.type =='text/xml'){
      fileReader= new FileReader();
      fileReader.onloadend=handleFileRead;
      fileReader.readAsText(file);
    }
    
    else{
      alert("File invalid")
    }
    
  
  }; 
  
  // File content to be displayed after 
  // file upload is complete 
  fileData = () => { 
  if (this.state.selectedFile) { 
    return ( 
    <div> 
      <h2>File Details:</h2> 
      <p>File Name: {this.state.selectedFile.name}</p> 
      <p>File Type: {this.state.selectedFile.type}</p> 
      <p> 
      Last Modified:{" "} 
      {this.state.selectedFile.lastModifiedDate.toDateString()} 
      </p> 
    </div> 
    ); 
  } else { 
    return ( 
    <div> 
      <br /> 
      <h4>Choose before Pressing the Upload button</h4> 
    </div> 
    ); 
  } 
  }; 
  
  render() { 
  
  return ( 
    <center>
    <div> 
      <h1> 
      Welcome   
      </h1> 
      <h3> 
      I hope that you have a preconceptual model! 
      </h3> 
      <div> 
        <input type="file" onChange={this.onFileChange} /> 
        <button onClick={this.onFileUpload}> 
        Upload! 
        </button> 
      </div> 
    {this.fileData()} 
    </div>
    </center>
  ); 
  } 
} 

export default App; 
