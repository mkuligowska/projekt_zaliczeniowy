import { useState, useEffect } from "react";

export const CreateAuthor = ({ onCreate, onUpdate, editingAuthor }) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    useEffect(() => {
        if (editingAuthor) {
            setName(editingAuthor.name);
            setSurname(editingAuthor.surname);
        } else {
            setName("");
            setSurname("");
        }
    }, [editingAuthor]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editingAuthor) {
            onUpdate(editingAuthor.id, { name, surname });
        } else {
            onCreate(event);
        }
    };

    return (
        <fieldset className="addingAuth">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="surname">Surname</label>
                    <input id="surname" name="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                </div>
                <button className="addAuth">{editingAuthor ? "Apply" : "Add author"}</button>
            </form>
        </fieldset>
    );
};