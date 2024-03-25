import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./components/contact/contact";
import AddContact from "./components/add-contact/add-contact";
import SideBarContact from "./components/side-bar-contact/side-bar-contact";
import ListaContato from "./components/contact-list/contact-list";
import contact from "./components/contact/contact";

interface Contact {
  name: string;
  id?: number;
  email?: string;
  phone?: string;
}

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // função para adicionar usuario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = date.now();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const newContact: Contact = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      id: id,
    };
    setContacts([...contacts, newContact]);
    form.reset();
    console.log(contacts);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SideBarContact />}>
          <Route path="/contact/:id" element={<Contact contact={contacts} />} />

          <Route
            path="/novo-contato"
            element={<AddContact addContact={handleSubmit} />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
