import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Outlet, Link } from "react-router-dom";
import SearchBox from "../search-box/search-box";
import ListaContato from "../contact-list/contact-list";
import Contact from "../contact/contact";
import AddContact from "../add-contact/add-contact";
import "./side-bar-contact.css";

interface Contato {
  name: string;
  id?: number;
  email?: string;
  phone?: string;
}

const SideBarContact: React.FC = () => {
  const [searchField, setSearchField] = useState<string>("");
  const [contacts, setContacts] = useState<Contato[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contato[]>(contacts);
  const [showAddContact, setShowAddContact] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        setContacts(users);
        setFilteredContacts(users);
      });
  }, []);

  useEffect(() => {
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchField.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [searchField, contacts]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const id = Date.now();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const newContact: Contato = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      id: id,
    };
    //  requisição POST para a API
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContact),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add contact");
      }
      const addedContact = await response.json();
      setContacts([...contacts, addedContact]);
      form.reset();
    } catch (error) {
      console.error("Error adding contact:", error);
    } finally {
      setIsLoading(false);
      alert(`Contato ${newContact.name} adicionado com Sucesso!`);
    }

    console.log("newContactAdded", newContact);
  };

  const ShowAddContact = () => {
    setShowAddContact(!showAddContact);
  };

  return (
    <>
      <div className="search-bar">
        <form role="search">
          <SearchBox
            onChangeHandler={handleSearchChange}
            placeholder="Procurar Contato"
          />
        </form>
        <form method="post">
          <Link to="/">
            <button
              onClick={ShowAddContact}
              className="new-button"
              type="submit"
            >
              <FontAwesomeIcon icon={faPlus} /> Novo
            </button>
          </Link>
        </form>
      </div>
      <div className="container-outlet">
        <div className="lista-contatos">
          <ListaContato contact={filteredContacts} />
        </div>
        <div className="outlet">
          <Outlet />
          {showAddContact && (
            <div className="container-form">
              <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nome" required />
                <input type="email" name="email" placeholder="Email" required />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefone"
                  required
                />
                <button className="botao-adicionar" type="submit">
                  Adicionar Contato
                </button>
              </form>
            </div>
          )}
          {isLoading && <p>Carregando...</p>}
        </div>
      </div>
    </>
  );
};

export default SideBarContact;
