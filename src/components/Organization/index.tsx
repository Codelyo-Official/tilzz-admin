import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "../Users/users.module.css";
import ModalDialog from "../common/ModalDialog";

interface Group {
  id: number;
  name: string;
  admin: string;
  noOfUsers: number;
}

const users: Group[] = [
  { id: 1, name: "Auto Junkies", admin: "m@gmail.com", noOfUsers: 3 },
  { id: 2, name: "World Affairs", admin: "m2gmail.com", noOfUsers: 11 },
  { id: 3, name: "Digital Media", admin: "m3@gmail.com", noOfUsers: 12 },
  { id: 4, name: "Theatre Film Tv", admin: "klo@gmail.com", noOfUsers: 0 },

];

const Organization: React.FC = () => {
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
          onClick={() => setOpen(true)}
        >
          Create New Group
        </button>
      </div>

      <div className={styles.userListContainer}>
        <h2 className={styles.tableTitle}>Groups</h2>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Admin</th>
              <th>User Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: Group) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.admin}</td>
                <td>{user.noOfUsers}</td>
                <td>
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

            {/* <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
              />
            </div> */}

            {/* <div className={styles.formGroup}>
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
            </div> */}

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

export default Organization;
