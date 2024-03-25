import React from "react";
import { Link, Outlet } from "react-router-dom";

import "./contact.css";

interface ContactProps {
  contact: {
    id: number;
    name: string;
    email: string;
    phone: number;
  };
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  const { id, name, email, phone } = contact;

  return (
    <div className="contatos">
      <img
        alt={`contact ${name}`}
        src={`https://robohash.org/${id}?set=set2&size=180x180`}
      />

      {/* <Link className="link-color" to={`/contact/${id}`}> */}
      <h2>{contact.name}</h2>
      {/* </Link> */}

      <p>{contact.phone}</p>
      <p>{contact.email}</p>
    </div>
  );
};

export default Contact;
