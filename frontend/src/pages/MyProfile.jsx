import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import {  AppContext } from '../context/AppContext'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name: 'John Doe',
    image:assets.profile_pic,
    email : 'johndoe@gmail.com',
    phone :'8854585957',
    address:{
      line1: "house 456 ",
      line2:" "
    },
    gender:'Not Selected',
    birthday:'Not Selected'
  })

  const [isEdit, setIsEdit] = useState(false)

  const [image, setImage] = useState(false)

  const { token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const updateUserProfileData = async () => {

        try {

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }


  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm pt-5'>
      <div>
        {isEdit
                ? <label htmlFor='image' >
                    <div className='inline-block relative cursor-pointer'>
                        <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                        <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                    </div>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </label>
                : <img className='w-36 rounded' src={userData.image} alt="" />
            }

        {
          isEdit
          ? <input type="text" className='bg-gray-50 text-3xl font-medium max-w-60' onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
          : <p className='font-medium text-3xl text-[#262626] mt-4'>{userData.name}</p>
        }

      </div>
      <hr />
      <div >
        <p className='text-[#797979] underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]' >
          
        <p className='font-medium'>Email Id:</p>
        <p className='text-blue-500'>{userData.email}</p>


        <p className='font-medium'>Phone:</p>
        {
          isEdit
          ?  <input className='bg-gray-50 max-w-52' type="number"  />
          : <p className='text-blue-500'>{userData.phone}</p>
        }
    

        <p className='font-medium' >Address:</p>
        {
          isEdit 
          ? <p>
          <input className='bg-gray-50 max-w-52' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
          <br />
          <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} /></p>
          : <p className='text-blue-500'>{userData.address.line1} <br /> {userData.address.line2} </p>
        }
        </div>
        <div>
          <div>
            <p className='text-[#797979] underline mt-3' >BASIC INFORMATION</p>
          </div>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
            <p>Gender:</p>
            {
              isEdit
              ? <select className='max-w-35 bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                <option value="Not Selected">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              : <p className='text-blue-500'>{userData.gender}</p>
            }
            
          </div>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
            <p>Birthday:</p>
            {
              isEdit
              ? <input className='max-w-28 bg-gray-50' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob}/>
              : <p className='text-blue-500'>{userData.birthday}</p>
            }
            
          </div>
          
        </div>
        <div className='mt-10'>

                {isEdit
                    ? <button onClick={updateUserProfileData} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Save information</button>
                    : <button onClick={() => setIsEdit(true)} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Edit</button>
                }

            </div>
        
      </div>
      
    </div>
  )
}

export default MyProfile
