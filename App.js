import React,{Component} from 'react';
import logo from './logo.svg';
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
      var regexEvento = /\D*ellipse\W/;
      var regexConcepto= /ded=0\W\w*\W\D/;
      var regexRelEstruct=/ded=1\D*\d\;a/;
      var regexRelDinamic=/1;\D*=1;dashed/;
      var regexlogro=/\d\W\w{6}W/;
      var i=0;
      var relaciones=[];
      var diagram=this.state.diagram;
      diagram.forEach(obj=>{
          if(obj.$.id==0 || obj.$.id==1){
            return null;
          }
          else if(regexEvento.test(obj.$.style)){
            diagram[obj.$.id].$.style='evento';
            console.log("Se encontro un evento",obj.$);
          }
          //console.log(obj.$);
          else if(regexConcepto.test(obj.$.style)){
            diagram[obj.$.id].$.style='concepto';
            console.log("Se encontro un concepto",obj.$);
          }
          else if(regexlogro.test(obj.$.style)){
            diagram[obj.$.id].$.style='logro';
            console.log("Se encontro un logro",obj.$);
          }
          else if(regexRelDinamic.test(obj.$.style)){
            diagram[obj.$.id].$.style='relDinamica';
            console.log("Se encontro una relacion dinamica",obj.$);
          }
          else if(regexRelEstruct.test(obj.$.style)){
            diagram[obj.$.id].$.style='relEstructural';
            console.log("Se encontro una relacion estructural",obj.$);
          }
          else{
            var source=obj.$.source;
            var target=obj.$.target;
            relaciones[i]={sourc:source,targ:target};
            //console.log('El elemento:',relaciones[i].sourc, ' esta unido con el elemento', relaciones[i].targ);
            i++;
          }   
      });
      console.log('RELACIONES-------------------');
      relaciones.forEach(rel=>{
        var idSource=rel.sourc;
        var idTarget=rel.targ;
        console.log('El/La "',diagram[idSource].$.style,'" que contiene :"',diagram[idSource].$.value,'" esta unido mediante un/una "'+diagram[idTarget].$.style,'" que contiene "',diagram[idTarget].$.value,'"');
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
            console.log('Elementos:',contentJSON)
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
