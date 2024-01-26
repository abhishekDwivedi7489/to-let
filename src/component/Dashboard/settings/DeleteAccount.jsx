import React from 'react'
import {FiTrash2} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteAccount } from '../../../services/operation/settingAPI'


const DeleteAccount = () => {

    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit =() => {
        dispatch(deleteAccount(token, navigate))
    }

  return (
    <section className="w-[100%] lg:w-[80%] mx-auto border-[1px] border-pink-700 gap-y-6 gap-x-5 bg-pink-900 py-4 px-4 flex flex-col sm:flex-row rounded-md mt-10">
        
        <section className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
            <FiTrash2 className="text-3xl text-pink-200"/>
        </section>
        <section className='flex flex-col gap-y-2 text-pink-600'>
            <p className='text-lg font-semibold'>Delete Account</p>
           
            <p>Would you like to delete account</p>

            <button
              className='w-fit cursor-pointer italic text-pink-300 hover:underline'
              onClick={handleSubmit}
            >
                I want to delete my account
            </button>
            
        </section>
    
    </section>
  )
}

export default DeleteAccount