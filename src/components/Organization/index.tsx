import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, NavLink } from 'react-router-dom';
import styles from "../Users/users.module.css";
import ModalDialog from "../../common/components/ModalDialog";
import { ApiError } from "../../types/apiError";
import axios from "axios";
import Dots from "../../common/components/dots";
import { Spinner } from "react-bootstrap";

interface Group {
  id: number;
  name: string;
  members_count: number;
  created_by: number;
}


const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const Organization: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user"); // Default role is 'user'
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newGroup = { name: groupName, description: '' };
    console.log("Creating group:", newGroup);

    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      const createGroups_response = await axios.post(`${API_BASE_URL}/api/accounts/organizations/`, newGroup, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(createGroups_response);
      setLoading(false);
      setGroups([...groups, createGroups_response.data.organization]);


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
      setLoading(true);
      const token = sessionStorage.getItem('token');
      const getGroups_response = await axios.get(`${API_BASE_URL}/api/accounts/organizations/list/`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(getGroups_response);
      setLoading(false);
      setGroups(getGroups_response.data);
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

  React.useEffect(() => {
    getAllGroups();
  }, [])

  const delOrganization = async (gid: number) => {

    try {
      const token = sessionStorage.getItem('token');
      const delGroup_response = await axios.delete(`${API_BASE_URL}/api/accounts/organizations/${gid}/delete/`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(delGroup_response);
      let result = groups.filter((g) => g.id !== gid);
      setGroups(result);

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
  };

  const confirmDelete = (gid: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this?");
    if (confirmed) {
      delOrganization(gid);
    }
  }

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
        {loading ? (<div style={{ width: "100%", height: "120px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Dots />
        </div>) : (
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
                    <button className={styles.editBtn} style={{ margin: "5px", position: "relative" }}>
                      <NavLink
                        className=""
                        style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }}
                        to={`/dashboard?activeTab=group-preview&groupId=${gr.id}&createdBy=${gr.created_by}`}
                        onClick={() => { }}
                      >
                      </NavLink>
                      Edit
                    </button>
                    <button className={styles.deleteBtn} style={{ margin: "5px" }} onClick={() => {
                      confirmDelete(gr.id);
                    }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>)}
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

export default Organization;
