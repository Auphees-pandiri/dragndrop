import React, {useMemo,useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { AiFillFileAdd } from "react-icons/ai";
import Dropzone ,{useDropzone} from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  height:300,
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  marginTop:30
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 300,
  height: 300,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: '100%',
  height: '100%'
};

function StyledDropzone(props) {
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open
  } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      console.log(acceptedFiles)
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  document.onpaste = function(event){
    console.log('pasted')
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    console.log(JSON.stringify(items)); 
    for (const index in items) {
      var item = items[index];
      if (item.kind === 'file') {
        var blob = item.getAsFile();
        var reader = new FileReader();
        reader.onload = function(event){
          console.log(event.target.result)
          
        };
        var pastedFiles = []
        pastedFiles.push(blob)
        console.log(pastedFiles)
        setFiles(pastedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })))
                   
        reader.readAsDataURL(blob);
      }
      console.log(index)
    }
  }

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {borderColor: "#000"}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <div style={{color: 'blue'}}>
        <AiFillFileAdd size={80} />
        </div>
        <h2 style={{color:'black'}}>Select Files to Upload</h2>
        <p style = {{color:'black'}}>or Drag and Drop, Copy and Paste Files</p>
      </div>
      <h2>Previws of files</h2>
      <aside style={thumbsContainer}>
        
         { files.map(file =>

          {
            return <div style={thumb} key={file.name}>
              <div style={thumbInner}>
                <img
                  src={file.preview}
                  style={img}
                />
                <img id="pastedImage"></img>
              </div>
            </div>
            return <h1></h1>
          }
        
      ) }
      </aside>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <StyledDropzone />
  </React.StrictMode>,
  document.getElementById('root')
);

