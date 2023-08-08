import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

import { categories } from '../utils/data';
import { client } from '../client';
import Spinner from './Spinner';

const CreatePin = ({user}) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

const navigate = useNavigate(); 

const uploadImage =(e)=>{
  const {type, name} = e.target.files[0]; 

  if(type === 'image/png' || type === 'image/svg' || type=== 'image/gif' || type === 'image/tiff'){
    setLoading(true)
    setWrongImageType(true)

    client.assets.upload('image', e.target.files[0], {contentType: type, filename: name})
    .then((document)=>{
setImageAsset(document);
setLoading(false);
    })
  }else {
    setWrongImageType(false)
  }
}

  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
     {fields && (
      <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'> Please fill in all the fields</p>
     )}
     <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
<div className='bg-secondaryColor p-3 flex flex-0.7 w-full'> 
<div className='lex justify-center items-center flex-col boarde-2 border-dotted border-gray-300 p-3 w-full h-420'>
{loading && (
  <Spinner/>
)}
{wrongImageType && (
  <p>
    Wrong image type
  </p>
)}
{(!imageAsset) ? (
  <label>
    <div className='flex flex-col items-center justify-center h-full'>
<div className='flex flex-col justify-center items-center'>
<p className='font-bold text-2xl'>
<AiOutlineCloudUpload />
</p>
<p className='text-lg'>
  Click to Upload
</p>
</div>
<p className='mt-32 text-gray-400'>
Use high-quality JPG, JPEG, SVG, PNG, GIF less than 20MB
</p>
    </div>
    <input
     type="file"
     name="upload-image"
     onChange={uploadImage}
     className="w-0 h-0"
    >
    </input>
  </label>
): (<p>
  SOmthingelse
</p>)}
</div>
</div>
     </div>
    </div>
  )
}

export default CreatePin
