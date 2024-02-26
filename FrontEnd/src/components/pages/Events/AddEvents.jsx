
import '../Events/Events.css'
import './DragDropImageUploader.css'
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import RichTextEditor from '../Events/RichTextEditor';

import { TextField } from '@mui/material';
import '../Events/AddEvents.css'
import axios from 'axios';

const config = {
  buttons: ["bold", "|", "italic", "|", "underline", "|", "link", "|", "font", "|", "fontsize", "|", "ul", "|", "ol", "|", "align", "|", "table", "|", "image", "|", "undo", "|", "redo", "|", "fullsize",]
}
const AddEvents = () => {
  // const [image, setimage] = useState("");
  const [title, settitle] = useState("");
  const [value1, setvalue1] = useState("");
  const [accept, setaccept] = useState(false);
  const [flag, setflag] = useState(true);
  const [images, setImages] = useState([]);
  const [faculty, setfaculty] = useState();

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);



  console.log(faculty);
  console.log(flag);
  //  console.log(image);
  function selectFiles() {
    fileInputRef.current.click();
  }

  function OnFilesSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }
  function deleteImage(index) {
    setImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );

  }

  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }

  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }
  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }
  // function uploadImage(){
  //   console.log("Images:", images);
  // }
  const navigate = useNavigate();

  async function Submit(e) {
    e.preventDefault();
    setaccept(true);
    if (title === '' || images === '' || faculty === '' || value1 === '') {
      setflag(false);
    } else setflag(true);
    if (flag) {
      //send message

      const res = await axios
        .post('http://localhost:3001/event/add', {
          title: title,
          description: value1,
          link: images[0].name,
          faculties_ids: [faculty]
        },);

      if (res.data) {
        alert('this Event Store Successfully');
        navigate("/events");
      }
    }
  }
  return (

    <form onSubmit={Submit}>

      <div className='row' style={{ width: "100%", marginLeft: "4%" }}>

        <div className='col-md-11' style={{ marginTop: "1px", marginTop: "70px" }}>
          {/* <DragDropImageUploader/> */}
          <div className="card1">
            <div className="top">
              <p> Drag & Drop Image Uploading</p>
            </div>
            <div className="drag-area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
              {isDragging ? (
                <span className="select">
                  Drop images here
                </span>
              ) : (
                <>
                  Drag & Drop image here or {" "}
                  <span className="select" role="button" onClick={selectFiles}>
                    Browse
                  </span>
                </>
              )}

              <input name="file" type="file" className="file" multiple ref={fileInputRef} onChange={OnFilesSelect} ></input>
            </div>
            <div className="container">
              {images.map((images, index) => (

                <div className="image" key={index}>
                  <span className="delete" onClick={() => deleteImage(index)}>&times;</span>
                  <img src={images.url} alt={images.name} />
                </div>
              ))}

            </div>
            {/* <button type="button" onClick={uploadImage}>
          Upload
        </button> */}
          </div>



          {images === '' && accept && <p className='error'>   Images is required </p>}



          {/* <input type='file' name='file' onChange={(e) => setimage(e.target.files[0]) }/>  */}
          <div style={{ marginBottom: "30px", marginTop: "40px" }}>
            <TextField
              fullWidth
              value={title}
              onChange={(e) => settitle(e.target.value)}
              id="title"
              label="Add Heading"
              multiline
              rows={2}
            />
            {/* <label htmlFor='title'> Enter the title  :-  </label>
         <input
          type='text'
          id="title"
          placeholder='Add Heading' 
          value={title}
          style={{width:"500px"}} 
          onChange={(e) => settitle(e.target.value)}
         /> */}

            {title === '' && accept && <p className='error'> Title is required </p>}

          </div>
          {/* <div style={{ marginBottom:"20px", marginTop:"20px"}}>
         <TextField
           fullWidth
           id="Tag"
           label="Add Tag"
           multiline
           rows={2}
          
         />
        </div>  */}

          <RichTextEditor setvalue={setvalue1} config={config} value={value1} onChange={(e) => setvalue1(e.target.value1)} />
          <br />
          {/* <div>
          {value1}
      
        </div> */}
          {value1 === '' && accept && <p className='error'> Describtion is required </p>}

        </div>
        <div>

          <select style={{ width: "92%", height: "70px", borderRadius: "6px", border: "2px solid rgb(196, 194, 195) " }} id="faculty" name="faculty" value={faculty} onChange={e => setfaculty(e.target.value)} >

            <option > Choose your Faculty </option>
            <option value="1">Computers and Information</option>
            <option value="2">Science</option>
            <option value="3">Art</option>
            <option value="5">Commerce</option>
            <option value="6">Education</option>
            <option value="7">Home economy</option>
            <option value="8">Medicine</option>
            <option value="9">Engineering</option>
            <option value="10">Mass communication</option>

            {faculty === '' && accept && <p className='error'> Choose faculty is required </p>}


          </select>
        </div>


        <button type='submit' className='button' >
          Add Event
        </button>
      </div>
    </form>

  );
}
export default AddEvents;


