
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

export default function Upload({
  name,
  lable,
  register,
  setValue,
  errors,
  viewData = null,
  editData = null,
}) {
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
 
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/jpg, image/png",
    noCookies: true, // Specify noCookies option to avoid relying on third-party cookies
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  }

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {lable} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col sm:p-6">
           
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
           <div className="flex w-full flex-col items-center p-6" >
               <div>             
               <label className="z-20">    
                <FiUploadCloud className="text-2xl text-yellow-50 " />
                 <input
                  type='file'
                  name='fileupload'
                  onChange={changeHandler}
                  className='w-0 h-0'
                 />

              </label>
              
            </div>
            <div  {...getRootProps()} className="flex w-full flex-col items-center">
            <input {...getInputProps()} ref={inputRef} />
            
              <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
               Drag and drop an image , or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
              </p>
              <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Accepted : jpeg, jpg, png
              </p>
              <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {lable} is required
        </span>
      )}
    </div>
  );
}
