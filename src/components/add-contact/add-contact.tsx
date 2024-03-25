import React, { useState } from "react";

import { Link } from "react-router-dom";
import "./add-contact.css";

interface Contato {
  name: string;
  id?: number;
  email?: string;
  phone?: string;
}

interface Props {
  addContact: (contact: Contato) => void;
}

const AddContact: React.FC<Props> = ({ addContact }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<number>(null);
  const [contacts, setContacts] = useState<Contato[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newContact: Contato = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    };
    setContacts([...contacts, newContact]);
    form.reset();
  };

  return (
    <div className="container-form">
      <form onSubmit={addContact}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* <Link to={"/"}> */}
        <button type="submit">Adicionar Contato</button>
        {/* </Link> */}
      </form>
    </div>
  );
};

export default AddContact;
