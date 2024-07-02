import React, { useEffect, useState } from "react";
import { CreateAuthor } from "./components/CreateAuthor";
import { AuthorsList } from "./components/AuthorList";
import "./styles.css";

const API_URL = "http://localhost:8000";

export default function App() {
  const [authors, setAuthors] = useState([]);
  const [editingAuthor, setEditingAuthor] = useState();

  useEffect(() => {
    fetch(`${API_URL}/authors`)
        .then(res => res.json())
        .then(data => setAuthors(data));
}, []);

const onDeleteAuthorClickHandler = (id) => {
  fetch(`${API_URL}/authors/${id}`, {
      method: 'DELETE',
  }).then((res) => {
      if (res.status === 200) {
          setAuthors((prevAuthors) =>
              prevAuthors.filter((author) => author.id !== id)
          );
      }
  });
};

  const onEditAuthorClickHandler = (author) => {
      setEditingAuthor(author);
    };

    const onCreateAuthorClickHandler = (event) => {
      event.preventDefault();

      const name = event.target.name.value;
      const surname = event.target.surname.value;

      fetch(`${API_URL}/authors`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name: name,
              surname: surname,
          }),
      })
          .then((res) => res.json())
          .then((data) => {
              if (data.id) {
                  setAuthors((prevAuthors) => [...prevAuthors, data]);
              }
          });
  };

  const onUpdateAuthorClickHandler = (id, updatedAuthor) => {
    fetch(`${API_URL}/authors/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAuthor),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            setAuthors((prevAuthors) =>
                prevAuthors.map((author) =>
                    author.id === id ? data : author
                )
            );
            setEditingAuthor(null);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};
  
  return (
    <div className="app">
      
      <div style={{ marginBottom: "50px" }}>
        <CreateAuthor onCreate={onCreateAuthorClickHandler} onUpdate={onUpdateAuthorClickHandler} editingAuthor={editingAuthor}/>
      </div>
      <AuthorsList authors={authors} onDelete={onDeleteAuthorClickHandler} onEdit={onEditAuthorClickHandler}/>
    </div>
  );
}
