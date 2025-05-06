import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, NavLink } from 'react-router-dom';
import styles from "../Users/users.module.css";
import ModalDialog from "../../common/components/ModalDialog";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

const users: User[] = [
  { id: 1, name: "Ali Hassan", email: "m@gmail.com", username: "Ali123" },
  { id: 2, name: "Nick", email: "m2gmail.com", username: "Nick_k" },
  { id: 3, name: "Ahmed", email: "m3@gmail.com", username: "Ahmedd04" },
  { id: 4, name: "Layla", email: "klo@gmail.com", username: "layla_89" },

];

const GroupPreview: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user"); // Default role is 'user'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newGroup = { groupName };
    console.log("Creating group:", newGroup);
    clearForm();
    setOpen(false);
  };

  const clearForm = () => {
    setGroupName("");
    setPassword("");
    setRole("user");
  };

  return (
    <>
    <div style={{ marginTop: "10px", marginBottom: "10px", display: "flex", justifyContent: "flex-end" }}>
        <button
          className={styles.createUserBtn}
          onClick={() => {}}
        >
          Save Changes
        </button>
      </div>
      <div className={styles.userListContainer}>
        <h2 className={styles.tableTitle}>Edit Group members for XYZ Group Name</h2>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id}>
                <td data-label="User Name">{user.name}</td>
                <td data-label="User Email">{user.email}</td>
                <td data-label="Username">{user.username}</td>
                <td data-label="Actions">
                    <input type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalDialog isOpen={open} onClose={() => setOpen(false)}>
        <div id={styles.createUserModalContainer}>
          <h2>Create New Group</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Group Name</label>
              <input
                type="text"
                id="groupName"
                name="groupName"
                value={groupName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setGroupName(e.target.value)}
                required
              />
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

export default GroupPreview;
