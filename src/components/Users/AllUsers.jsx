import React from "react";
import "./users.css";
import ModalDialog from "../ModalDialog";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", password: "abcdefg", active: true, role: "admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", password: "abcdefg", active: false, role: "user" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", password: "abcdefg", active: true, role: "sub-admin" },
];

const UserList = () => {

  const [open, setOpen] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('user'); // Default role is 'user'

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { email, password, role };
    clearForm();
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setRole('user');
  };



  return (
    <>
      <div style={{ marginTop: "10px", marginBottom: "10px", display: "flex", justifyContent: "flex-end" }}>
        <button style={{ marginRight: "20px", border: "solid 1px black", height: "40px", paddingLeft: "15px", paddingRight: "15px", borderRadius: "20px", fontSize: "14px" }} onClick={() => {
          setOpen(true)
        }}>Create New User</button>
      </div>
      <div className="user-list-container">
        <h2 className="table-title">User List</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Status</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <span className={user.active ? "status-active" : "status-inactive"}>
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="capitalize">{user.role}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalDialog isOpen={open} onClose={() => setOpen(false)}
      >
        <div id="create-user-modal-container">
          <h2>Create New User</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="subadmin">Sub Admin</option>
              </select>
            </div>

            <div className="form-actions">
              <button >Create User</button>
              <button onClick={()=>setOpen(false)}>Close</button>
            </div>
          </form>
        </div>
      </ModalDialog>
    </>
  );
};

export default UserList;

