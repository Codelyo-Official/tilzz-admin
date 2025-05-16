import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, NavLink } from 'react-router-dom';
import styles from "../Users/users.module.css";
import ModalDialog from "../../common/components/ModalDialog";
import { ApiError } from "../../types/apiError";
import axios from "axios";

interface Group {
  id: number;
  name: string;
  members_count: number;
  created_by:number;
}


const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const Organization: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user"); // Default role is 'user'
  const [groups,setGroups] = useState<Group[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newGroup = { name:groupName,description:'' };
    console.log("Creating group:", newGroup);

    try {

      const token = sessionStorage.getItem('token');
      const createGroups_response = await axios.post(`${API_BASE_URL}/api/accounts/organizations/`,newGroup, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(createGroups_response);
      setGroups([...groups,createGroups_response.data.organization]);


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

    clearForm();
    setOpen(false);
  };

  const clearForm = () => {
    setGroupName("");
    setPassword("");
    setRole("user");
  };

  const getAllGroups = async () => {

    try {

      const token = sessionStorage.getItem('token');
      const getGroups_response = await axios.get(`${API_BASE_URL}/api/accounts/organizations/list/`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(getGroups_response);
      setGroups(getGroups_response.data);


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
    getAllGroups();
  }, [])

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
              <th>User Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((gr: Group) => (
              <tr key={gr.id}>
                <td data-label="Name">{gr.name}</td>
                <td data-label="Members Count">{gr.members_count}</td>
                <td data-label="Actions">
                  <button className={styles.editBtn} style={{ margin: "5px",position:"relative" }}>
                    <NavLink
                      className=""
                      style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }}
                      to={`/dashboard?activeTab=group-preview&groupId=${gr.id}&createdBy=${gr.created_by}`}
                      onClick={() => { }}
                    >
                    </NavLink>
                    Edit
                  </button>
                  <button className={styles.deleteBtn} style={{ margin: "5px" }}>Delete</button>
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

export default Organization;
