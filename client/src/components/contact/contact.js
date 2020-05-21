import React from 'react';

const test = () => {
    return localStorage.getItem('annonce1');
}

const Contact = () => {
    
    return(
        <div>
            {test()}
        </div>
    )
}

export default Contact;