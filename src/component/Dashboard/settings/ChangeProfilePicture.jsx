import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { BiUpload } from 'react-icons/bi'
import { updateProfilePicture } from '../../../services/operation/settingAPI';
import './changeProfilepic.css'
const ChangeProfilePicture = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const [image, setimage] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);

    function changeHandler(e){
        const file = e.target.files[0];
        if(file){
            setimage(file);
        }
    }

    function prevfile(image){
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onloadend = () =>{
            setPreviewSource(reader.result);
          }
    }

    useEffect(() => {
        if(image){
            prevfile(image)
        }
    },[image])

    function imageSubmit(e){
        e.preventDefault();
        const formData = new FormData();
      
            formData.append("displayPicture",image);
            dispatch(updateProfilePicture(formData,token,navigate))
        
    }


  return (
    <section className='bg-richblack-800 flex flex-row gap-x-10 text-richblack-5 rounded-md items-center py-4 px-4 w-[100%] lg:w-[80%] mx-auto'>
        <img src={ previewSource || user?.image} alt='Server Down'
            className='aspect-square w-[100px] rounded-full  object-center'
        />
        <div className='profile'>
            <p className='text-richblack-200 text-lg font-semibold'>Edit Profile Picture</p>
            <form onSubmit={imageSubmit} className='profile-form'>
                <div className='update-profile-select'>
                <label className='border-[1px] border-[black] cursor-pointer bg-[#00008B] text-richblack-5 rounded-md font-inter text-lg py-1 px-2'>
                   
                   Select
                 
                 <input
                  type='file'
                  name='fileupload'
                  onChange={changeHandler}
                  className='w-0 h-0'
                 />

              </label>
              <p>
                  {
                      image !== null ? (image.name):"none"
                  }
              </p>
                </div>
                <IconBtn
                 text={"Upload"}
                 type={"Submit"}
                >
                 <BiUpload/>
                </IconBtn>
            </form>
        </div>
    </section>
  )
}

export default ChangeProfilePicture