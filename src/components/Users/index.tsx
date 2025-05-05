import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./users.module.css";
import ModalDialog from "../../common/components/ModalDialog";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  role: string;
}

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", password: "abcdefg", active: true, role: "admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", password: "abcdefg", active: false, role: "user" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", password: "abcdefg", active: true, role: "sub-admin" },
];

const UserList: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user"); // Default role is 'user'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = { email, password, role };
    console.log("Creating user:", newUser);
    clearForm();
    setOpen(false);
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setRole("user");
  };

  return (
    <>
      <div style={{ marginTop: "10px", marginBottom: "10px", display: "flex", justifyContent: "flex-end" }}>
        <button
          className={styles.createUserBtn}
          onClick={() => setOpen(true)}
        >
          Create New User
        </button>
      </div>

      <div className={styles.userListContainer}>
        <h2 className={styles.tableTitle}>User List</h2>
        <table className={styles.userTable}>
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
            {users.map((user: User) => (
              <tr key={user.id}>
                <td data-label="Name">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Password">{user.password}</td>
                <td data-label="Status">
                  <span className={user.active ? "status-active" : "status-inactive"}>
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td data-label="Role" className={styles.capitalize}>{user.role}</td>
                <td data-label="Actions">
                  <button className={styles.editBtn} style={{margin:"5px"}}>Edit</button>
                  <button className={styles.deleteBtn} style={{margin:"5px"}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalDialog isOpen={open} onClose={() => setOpen(false)}>
        <div id={styles.createUserModalContainer}>
          <h2>Create New User</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="subadmin">Sub Admin</option>
              </select>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.createUserBtn}
              >Create</button>
              <button className={styles.cancelBtn} type="button" onClick={() => setOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </ModalDialog>
    </>
  );
};

export default UserList;
