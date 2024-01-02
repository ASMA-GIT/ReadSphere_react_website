import React,{useEffect} from 'react';
import costbreakdown from '.././assests/breakdown.png';

const OrderSummary = ({formData,setFormData,totalcost}) => {
  useEffect(()=>{
    setFormData((data)=>({...data, SubTotal:totalcost, GrandTotal:totalcost+6.89}))
    console.log(formData);
    // eslint-disable-next-line
  },[totalcost])

  return (
    <div>

      <div className='cost_container'>
        <div className='costItems'>
          <div>SubTotal</div>
          <div>${totalcost}</div>
        </div>
        <div className='costItems'>
          <div>Shipping</div>
          <div>$4.89</div>
        </div>
        <div className='costItems'>
          <div>Estimated Tax</div>
          <div>$2.00</div>
        </div>
        <div className='progressbar'></div>
        <div className='costItems'>
          <div>Total</div>
          <div>${totalcost+6.89}</div>
        </div>
      </div>
      <div className='breakdown_img'>
        <img src={costbreakdown} alt='imagebreakdown'/>
      </div>
    </div>
  )
}

export default OrderSummary