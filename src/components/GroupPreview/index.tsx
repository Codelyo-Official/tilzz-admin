import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, NavLink } from 'react-router-dom';
import styles from "../Users/users.module.css";
import ModalDialog from "../../common/components/ModalDialog";
import { useLocation } from "react-router-dom";
import { ApiError } from "../../types/apiError";
import { useAuth } from "../../contexts/AuthProvider";
import axios from "axios";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  profile: {
    role: string;
  }
}


const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const GroupPreview: React.FC = () => {
  const { user }: any = useAuth();
  const [users, setUsers] = React.useState<User[]>([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const GroupId = queryParams.get('groupId');
  const groupadminId = queryParams.get('createdBy');
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

  const getAllUsers = async () => {
    try {

      let targetRoute = "/api/stories/admin/users/";
      let temp_user = "admin";

      console.log(user.id, groupadminId)
      if (groupadminId === null)
        return;
      if (user.role === "admin") {
        if (user.id === parseInt(groupadminId)) {

          // all users

        } else {
          temp_user = "subadmin"
          // only users under subadmin
          targetRoute = `/api/accounts/subadmins/${groupadminId}/users/`;
        }
      } else if (user.role === "subadmin") {
        temp_user = "subadmin"

        // only users under subadmin
        targetRoute = `/api/accounts/subadmins/${groupadminId}/users/`;
      }

      const token = sessionStorage.getItem('token');
      const getUsers_response = await axios.get(`${API_BASE_URL}${targetRoute}`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(getUsers_response);
      if (temp_user === "admin") {
        setUsers(getUsers_response.data);
      } else if (temp_user === "subadmin") {
        setUsers(getUsers_response.data.assigned_users);
      }

    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.error || 'Something went wrong on the server!';
        alert(errorMessage);
      }
    } finally {
    }
  }

  React.useEffect(() => {
    getAllUsers();
  }, [])

  return (
    <>
      <div style={{ marginTop: "10px", marginBottom: "10px", display: "flex", justifyContent: "flex-end" }}>
        <button
          className={styles.createUserBtn}
          onClick={() => { }}
        >
          Save Changes
        </button>
      </div>
      <div className={styles.userListContainer}>
        <h2 className={styles.tableTitle}>Edit Group members for XYZ Group Name</h2>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>User Email</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((cuser: User) => {

              if(cuser.id===user.id)
                return;

              return (
                <tr key={cuser.id}>
                  <td data-label="Name">{cuser.first_name} {cuser.last_name}</td>
                  <td data-label="User Email">{cuser.email}</td>
                  <td data-label="Username">{cuser.username}</td>
                  <td data-label="Actions">
                    <input type="checkbox" />
                  </td>
                </tr>);
            })}
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
