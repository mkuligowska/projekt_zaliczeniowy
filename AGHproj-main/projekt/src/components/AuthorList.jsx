export const AuthorsList = ({ authors = [], onDelete, onEdit }) => (
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody className="dataList">
            {authors.map((author) => (
                <tr key={author.id}>
                    <td>{author.name}</td>
                    <td>{author.surname}</td>
                    <td>
                        <button className="editButt" onClick={() => onEdit(author)}>Edit</button>
                        <button className="delButt" onClick={() => onDelete(author.id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);