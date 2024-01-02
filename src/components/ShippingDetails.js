import React from 'react'

const ShippingDetails = ({formData,setFormData}) => {
  return (
    <div>
      <div className='shippingContainer'>
        <div>
          <input type='text' placeholder='Street Address' required
          value={formData.StreetAddress}
           onChange={(e)=>setFormData({...formData, StreetAddress:e.target.value})}/>
        </div>
        <div>
          <input type='text' placeholder='Apt/Suite/Floor(Optional)'
           value={formData.apt}
           onChange={(e)=>setFormData({...formData,apt:e.target.value})}/>
        </div>
        <div className='divide'>
          <input type='text' placeholder='State'
          value={formData.State}
          onChange={(e)=>setFormData({...formData,State:e.target.value})}/>
          <input type='number' placeholder='Zip Code'
          value={formData.ZipCode}
          onChange={(e)=>setFormData({...formData,ZipCode:e.target.value})}/>
        </div>
        <div>
          <input type='number' placeholder='Phone'
          value={formData.Phone}
          onChange={(e)=>setFormData({...formData,Phone:e.target.value})}/>
        </div>
        <div>
          <input type='email' placeholder='Email'
          value={formData.Email}
          onChange={(e)=>setFormData({...formData,Email:e.target.value})}/>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails