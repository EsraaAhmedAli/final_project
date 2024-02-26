

import './DragDropImageUploader.css'
import React, { useState, useRef } from 'react';

import RichTextEditor from './RichTextEditor';
import '../News/AddNews.css'

import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//import DragDropImageUploader from './DragDropImageUploader';
import axios from 'axios';
// import { Button } from 'react-bootstrap';
const config = {
    buttons: ["bold", "|", "italic", "|", "underline", "|", "link", "|", "font", "|", "fontsize", "|", "ul", "|", "ol", "|", "align", "|", "table", "|", "image", "|", "undo", "|", "redo", "|", "fullsize",]
}
const AddNews = () => {
    // const [image, setimage] = useState("");
    const [title, settitle] = useState("");
    const [value1, setvalue1] = useState("");
    const [accept, setaccept] = useState(false);
    const [flag, setflag] = useState(true);
    const [faculty, setfaculty] = useState();
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);




    console.log(title);
    console.log(value1);
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
        if (title === '') {
            setflag(false);
        } else setflag(true);
        if (flag) {
            //send message

            const res = await axios
                .post('http://localhost:3001/news/add', {

                    title: title,
                    description: value1,
                    link: images[0].name,
                    faculties_ids: [faculty],

                },);

            if (res.data) {
                alert('this News Store Successfully');
                navigate("/news");
            }

        };

    }

    return (

        <form onSubmit={Submit}>

            <div className='row' style={{ width: "1200px", marginLeft: "80px" }}>

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


                    <RichTextEditor setvalue={setvalue1} config={config} value={value1} onChange={(e) => setvalue1(e.target.value1)} />
                    <br />
                    {/* <div>
            {value1}
        
        </div> */}
                    <select style={{ width: "1080px", height: "70px", borderRadius: "6px", border: "2px solid rgb(196, 194, 195) ", padding: "10px" }} id="faculty" name="faculty" value={faculty} onChange={e => setfaculty(e.target.value)} >

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
                    Add New
                </button>
            </div>
        </form>

    );
}
export default AddNews;


