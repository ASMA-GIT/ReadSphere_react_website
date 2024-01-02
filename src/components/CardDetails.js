import React from 'react';
import { IoCard } from 'react-icons/io5';
import { FaCcMastercard } from 'react-icons/fa6';
import { FaCcVisa } from 'react-icons/fa6';
import { HiCreditCard } from 'react-icons/hi2';
import { FaCcPaypal } from 'react-icons/fa';

const CardDetails = ({cardData,setCardData}) => {

  return (
    <div>
      <div>
        <p>Name on Card</p>
        <input
          type='text'
          placeholder='Name'
          name='name'
          required
          value={cardData.name}
          onChange={(e)=>setCardData({...cardData, name:e.target.value})}
        />
      </div>
      <div>
        <p>Card number</p>
        <input
          type='text'
          placeholder='XXXX XXXX XXXX XXXX'
          style={{ appearance: 'textfield', MozAppearance: 'textfield' }}
          name='cardNumber'
          value={cardData.cardNumber}
          onChange={(e)=>setCardData({...cardData, cardNumber:e.target.value})}
        />
      </div>
      <div className='divide'>
        <input
          type='number'
          placeholder='MM/YY'
          name='expiry'
          value={cardData.expiry}
          onChange={(e)=>setCardData({...cardData, expiry:e.target.value})}
        />
        <input
          type='number'
          placeholder='CVV'
          name='cvv'
          value={cardData.cvv}
          onChange={(e)=>setCardData({...cardData, cvv:e.target.value})}
        />
      </div>
      <div className='democards'>
        <FaCcVisa className='paycard' />
        <HiCreditCard className='paycard' />
        <FaCcMastercard className='paycard' />
        <IoCard className='paycard' />
        <FaCcPaypal />
      </div>
    </div>
  );
};

export default CardDetails;
