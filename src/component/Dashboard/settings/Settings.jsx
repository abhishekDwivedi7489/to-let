import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <section className="mx-auto">
      <p className="text-3xl font-inter font-bold mt-1 mb-11 ml-11 text-caribbeangreen-900 text-Shadow">Edit Profile</p>
       <ChangeProfilePicture/>

       <EditProfile/>

       <ChangePassword/>

       <DeleteAccount/>
    </section>
  )
}

export default Settings