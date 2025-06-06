import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./users.module.css";
import ModalDialog from "../../common/components/ModalDialog";
import { useAuth } from "../../contexts/AuthProvider";
import { ApiError } from "../../types/apiError";
import axios from "axios";
import Dots from "../../common/components/dots";
import { Spinner } from "react-bootstrap";

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


const UserList: React.FC = () => {

  const { user, setUser }: any = useAuth();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user"); // Default role is 'user'
  const [users, setUsers] = React.useState<User[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = { email, username, password, role };
    console.log("Creating user:", newUser);

    // /api/accounts/users/create/
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      const createUser_response = await axios.post(`${API_BASE_URL}/api/accounts/users/create/`, newUser, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(createUser_response);
      setLoading(false);
      setUsers([...users, createUser_response.data.user]);

    } catch (err: any) {
      console.log(err)
      setLoading(false);
      const apiError = err as ApiError;
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.error || 'Something went wrong on the server!';
        alert(errorMessage);
      }
    } finally {
    }

    clearForm();
    setOpen(false);
  };

  const getAllUsers = async () => {

    try {
      setLoading(true);
      const targetRoute = user.role === "subadmin" ? `/api/accounts/subadmins/${user.id}/users/` : "/api/stories/admin/users/";
      const token = sessionStorage.getItem('token');
      const getUsers_response = await axios.get(`${API_BASE_URL}${targetRoute}`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(getUsers_response);
      setLoading(false);
      if (user.role === "admin") {
        setUsers(getUsers_response.data);
      } else {
        setUsers(getUsers_response.data.assigned_users);
      }

    } catch (err: any) {
      setLoading(false);
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

  const delUser = async (deluserid: number) => {

    try {
      const token = sessionStorage.getItem('token');
      const delUser_response = await axios.delete(`${API_BASE_URL}/api/accounts/${user.role}/users/${deluserid}/delete/`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(delUser_response);
      let result = users.filter((user) => user.id !== deluserid);
      setUsers(result);

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

  const confirmDelete = (cuserid: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this?");
    if (confirmed) {
      delUser(cuserid);
    }
  }

  React.useEffect(() => {
    getAllUsers();
  }, [])

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
        {loading ? (<div style={{ width: "100%", height: "120px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Dots />
        </div>) : (
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((cuser: User) => {
                if (user.id === cuser.id)
                  return;

                return (<tr key={cuser.id}>
                  <td data-label="Name">{cuser.first_name} {cuser.last_name}</td>
                  <td data-label="Username">{cuser.username}</td>
                  <td data-label="Email">{cuser.email}</td>
                  <td data-label="Role" className={styles.capitalize}>{cuser.profile.role}</td>
                  <td data-label="Actions">
                    <button className={styles.deleteBtn} style={{ margin: "5px" }} onClick={() => {
                      confirmDelete(cuser.id);
                    }}>Delete</button>
                  </td>
                </tr>)
              })}
            </tbody>
          </table>)}
      </div>

      <ModalDialog isOpen={open} onClose={() => setOpen(false)}>
        <div id={styles.createUserModalContainer}>
          <h2>Create New User</h2>
          <form onSubmit={handleSubmit}>

            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="username"
                id="username"
                name="username"
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                required
              />
            </div>

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
                {user !== null && user.role === "admin" && (
                  <>
                    <option value="admin">Admin</option>
                    <option value="subadmin">Sub Admin</option>
                  </>
                )}

              </select>
            </div>


            {!loading ? (
              <div className={styles.formActions}>
                <button type="submit" className={styles.createUserBtn}
                >Create</button>
                <button className={styles.cancelBtn} type="button" onClick={() => setOpen(false)}>
                  Cancel
                </button>
              </div>) : (
              <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Spinner animation="grow" role="status" style={{ color: "blue", fontSize: "20px", background: "#ACA6FF" }}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}

          </form>
        </div>
      </ModalDialog>
    </>
  );
};

export default UserList;
