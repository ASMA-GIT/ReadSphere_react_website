import React from 'react';
import './css/Contact.css';
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsFacebook } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";

const Contact = () => {
  return (
    <div className='contact_card'>
        <div className='contact_details'>
            <div className='contact_details_left'>
                <h2 className='highlight'>Get the Latest Updates</h2>
                <div className='line'></div>
                <div className='subscribe_container'>
                    <h3>Let's stay connected. Follow Us on</h3>
                </div>
                <div className='social_icons_container'>
                    <div>
                    Twitter: <FaSquareXTwitter />
                    </div>
                    <div>
                    FaceBook: <BsFacebook />
                    </div>
                    <div>
                    Discord: <BsDiscord />
                    </div>
                </div>
                <p></p>
            </div>
            <div className='contact_details_right'>
                <h2 className='highlight'>Disclamer</h2>
                <div className='line'></div>
                <p>BookHub does not host any files on its platform; instead, it serves as a gateway to third-party services. Any legal concerns or issues related to content should be directed to the respective file hosts and providers. BookHub disclaims responsibility for any media files displayed by the book providers linked through its website. Users are encouraged to comply with applicable copyright laws and terms of service provided by the linked platforms.</p>
            </div>
        </div>
    </div>
  )
}

export default Contact