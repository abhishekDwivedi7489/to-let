import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Instructions = ({lable,name,errors,register,setValue,getValues,placeholder}) => {
    const {home, editHome} = useSelector((state) => state.home)
    const [instructionList, setInstructionList] = useState([]);
    const [requirement, setRequirement] = useState("");

    useEffect(()=>{
        if(editHome){
            setInstructionList(home?.instructions)
            setValue(name,{required:true});
        }
    },[]);

    useEffect(() => {
           setValue(name, instructionList)
    },[instructionList])

    const handleAddInstruction = (e) => {
        e.stopPropagation();
        if(requirement){
            setInstructionList([...instructionList, requirement]);
            setRequirement("");
        }
        e.stopPropagation();
    }

    const handleRemoveIns = (index) =>{
          const updateInstruction = [...instructionList]
          updateInstruction.splice(index, 1);
          setInstructionList(updateInstruction);
    }
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm text-richblack-5">{lable}<span className='text-pink-200'>*</span></label>
      <div className="flex flex-col items-start space-y-2">
        <input
            id={name}
            type='text'
            placeholder={placeholder}
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            className='w-full form-style'
        />
        <button
          onClick={handleAddInstruction}
          className='font-semibold text-yellow-50'
        >
            Add
        </button>
      </div>

      {
        instructionList?.length > 0 &&
        (<ul className="mt-2 list-inside list-disc">
            {
                instructionList.map((item, i) =>(
                   <li key={i} className="flex items-center text-richblack-5">
                      <span>{item}</span>
                      <button
                         onClick={()=>handleRemoveIns(i)}
                         className="ml-2 text-xs text-pure-greys-300 "
                      >
                        Clear
                      </button>
                   </li> 
                ))
            }
        </ul>)
      }
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {lable} is required
        </span>
      )}
    </div>
  )
}

export default Instructions