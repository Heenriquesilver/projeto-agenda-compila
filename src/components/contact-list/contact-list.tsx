import React from "react";
import Contact from "../contact/contact";
import "./contact-list.css";

interface Contato {
  id: number;
  name: string;
  email: string;
  phone: number;
}

interface ListaContatoProps {
  contact: Contato[];
}

const ListaContato: React.FC<ListaContatoProps> = ({ contact }) => {
  const sortedContacts = contact.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="lista">
      {sortedContacts.map((contactItem) => (
        <Contact
          key={contactItem.id}
          contact={{
            id: contactItem.id,
            name: contactItem.name,
            email: contactItem.email,
            phone: contactItem.phone,
          }}
        />
      ))}
    </div>
  );
};

export default ListaContato;
