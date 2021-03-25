import React from 'react';

function Contact(props) {
  return (
    <div className="row text-center">
      <div className="col-3">
        {props.phone}
      </div>
      <div className="col-3">
        {props.email}
      </div>
      <div className="col-3">
        {props.website}
      </div>
      <div className="col-3">
        {props.city}
      </div>
    </div>
  )
}

export default Contact;