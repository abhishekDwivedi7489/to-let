import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import {RxCross2} from 'react-icons/rx'

const FacilityForm = ({labelName,name,setValue,getValues,register,errors,placeholder,tags,setTags}) => {
    const {home, editHome} = useSelector((state)=>state.home)
         const [chipValue, setChipvalue] = useState("")
    
        //setValue(tags);
        useEffect(()=>{
          if(editHome){
            setTags(home?.facility);
          }
            register(name,{
            require:true,
            //validate:value => value.length > 0,
          })
        },[])
        useEffect(()=>{
            setValue(name,tags);
        },[tags])
     
        const handleAddTags = (event) =>{
                event.preventDefault();
                event.stopPropagation();
                setTags([...tags, chipValue])
                setChipvalue("")
              }
    
        
      
        const closeHandler=(index)=>{
             // setTags(tags.filter((ele, i) => i !== index))
              const updateList = [...tags];
              updateList.splice(index,1);
              setTags(updateList);
        }

        return (
          <div className=''>
             
              <div className='flex flex-row gap-x-3 w-full'>
              { 
                  
                  tags?.map( (tag, index) => (
                      <div key={index} className='bg-yellow-900 max-w-max flex flex-row items-center space-x-1 max-h-max rounded-full py-1 px-3'>
                          <span className='text-white'>{tag}</span>
                          <span onClick={()=>closeHandler(index)}>
                          <RxCross2  className='text-richblack-100 text-[12px] font-bold'/>
                          </span>
                      </div>
                  ))
              }
              </div>
      
            <div className="flex flex-col items-start space-y-2">
            <label htmlFor={name} className="text-sm text-richblack-5">{labelName}<sup className='text-pink-200'></sup></label>
             
             <input
              type='text'
              id={name}
              value={chipValue}
              placeholder={placeholder}
              className='w-full form-style'
              onChange={(e) => setChipvalue(e.target.value)}
             />
              <button
              onClick={handleAddTags}
              className='font-semibold text-yellow-50'
             >
              Add
             </button>
             {
              errors[name] && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">Facilities are require And Press Enter</span>
              )
             }
            </div>
      
          </div>
        )
    
      
    }
    

export default FacilityForm
