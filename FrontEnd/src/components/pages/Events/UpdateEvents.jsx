
import './DragDropImageUploader.css'
import React, { useState, useRef, useEffect } from 'react';

import RichTextEditor from '../Events/RichTextEditor';
import { useNavigate } from 'react-router-dom';

import { TextField } from '@mui/material';


import axios from 'axios';

const config = {
    buttons: ["bold", "|", "italic", "|", "underline", "|", "link", "|", "font", "|", "fontsize", "|", "ul", "|", "ol", "|", "align", "|", "table", "|", "image", "|", "undo", "|", "redo", "|", "fullsize",]
}

export default function UpdateEvents() {
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");


    const [images, setImages] = useState([]);
    const [faculty, setfaculty] = useState();

    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

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

    console.log(description);
    const id = Number(window.location.pathname.replace("/events/", ""));
    console.log(id);
    useEffect(() => {
        axios.get(`http://localhost:3001/event/${id}`).then((data) => {
            settitle(data.data.title);
            setdescription(data.data.description);
            setImages(data.data.link);
            console.log(data);

            <diV> data.data.description</diV>

        });
    }, []);

    const navigate = useNavigate();
    async function HandleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.patch(`http://localhost:3001/event/update/${id}`,
                {
                    title: title,
                    description: description,
                    link: images[0].name,


                });
            if (res.data) {
                alert('this Events Update Successfully');
                navigate("/events");
            }
        } catch (err) {
            console.log(err);

        }

    }

    return (
        <div>
            <h2 style={{marginLeft:"7%"}}> Update Events </h2>


            <form onSubmit={HandleSubmit} >

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
                                {/* {images.map((images,index)=>(
                    
                    <div className="image" key={index}>
                    <span className="delete" onClick= {()=> deleteImage(index)}>&times;</span>
                    <img src={images.url} alt={images.name}/>
                </div>
             ))} */}

                            </div>
                            {/* <button type="button" onClick={uploadImage}>
                Upload
        </button> */}
                        </div>






                        {/* text field */}



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



                        </div>


                        <div style={{ marginBottom: "30px", marginTop: "40px" }}>
                            <TextField
                                fullWidth
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                                id="description"
                                label="Add  description"
                                multiline
                                rows={9}
                            />



                        </div>

                        {/* 
                        <RichTextEditor setvalue={setdescription} config={config} value={description} onChange={(e) => setdescription(e.target.value)} /> */}

                        <br />
                        {/* <div>
            {value1}
        
        </div> */}

                    </div>
                    <div>

                        {/* <select style={{width:"1080px", height:"70px",borderRadius:"6px" ,  border: "2px solid rgb(196, 194, 195) " , padding:"10px"}} id="faculty" name="faculty" value={faculty} onChange={e=>setfaculty(e.target.value)} >

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
        </select> */}
                    </div>


                    <button type='submit' className='button' >
                        Update Event
                    </button>
                </div>
            </form>
        </div>

    )
}