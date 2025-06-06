import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, NavLink } from 'react-router-dom';
import styles from "../Users/users.module.css";
import ModalDialog from "../../common/components/ModalDialog";
import { useLocation } from "react-router-dom";
import { ApiError } from "../../types/apiError";
import { useAuth } from "../../contexts/AuthProvider";
import axios from "axios";
import { compose } from "@reduxjs/toolkit";
import Dots from "../../common/components/dots";

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
  const [allusers, setAllUsers] = React.useState<User[]>([]);


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const GroupId = queryParams.get('groupId');
  const groupadminId = queryParams.get('createdBy');
  const [open, setOpen] = useState<boolean>(false);
  const [open1, setOpen1] = useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [groupName, setGroupName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user"); // Default role is 'user'

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const checkboxes = form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    const checkedValues: number[] = [];

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedValues.push(parseInt(checkbox.value));
      }
    });

    let result = checkedValues.join(', ')

    console.log(result)

    /// api/accounts/organizations/{org-id}/add-member/

    console.log('Checked values:', checkedValues);

    try {
      const token = sessionStorage.getItem('token');
      const addtoGroupApiResponse = await axios.post(`${API_BASE_URL}/api/accounts/organizations/${GroupId}/add-member/`, {
        user_ids: result
      }, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(addtoGroupApiResponse);
      await getUsersinOrganization();

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

  const removefromorganization = async (uid: number) => {

    // api/accounts/organizations/{org-id}/remove-member/{user-id}/

    try {
      const token = sessionStorage.getItem('token');
      console.log(token)
      const removefromGroupApiResponse = await axios.post(`${API_BASE_URL}/api/accounts/organizations/${GroupId}/remove-member/${uid}/`, {}, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(removefromGroupApiResponse);
      await getUsersinOrganization();

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
        if (users.length > 0) {
          if (user.id === parseInt(groupadminId)) {
            // all users
          } else {
            if (users[0].profile.role === "subadmin") {
              // only users under subadmin
              temp_user = "subadmin"
              targetRoute = `/api/accounts/subadmins/${groupadminId}/users/`;
            }
          }
        }
      } else if (user.role === "subadmin") {
        // only users under subadmin
        temp_user = "subadmin"
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
        setAllUsers(getUsers_response.data);
      } else if (temp_user === "subadmin") {
        setAllUsers(getUsers_response.data.assigned_users);
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

  const getUsersinOrganization = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      const getGroupDetails_response = await axios.get(`${API_BASE_URL}/api/accounts/organizations/${GroupId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      console.log(getGroupDetails_response);
      setLoading(false);
      setGroupName(getGroupDetails_response.data.organization.name)
      setUsers(getGroupDetails_response.data.members)
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

  const checkifinusers = (uid: number) => {
    for (let i = 0; i < users.length; i++) {
      if (uid === users[i].id)
        return true;
    }
    return false;
  }

  React.useEffect(() => {
    // getAllUsers();
    getUsersinOrganization();
  }, [])

  React.useEffect(() => {
    if (open1) {
      getAllUsers();
    }
  }, [open1])

  const confirmDelete = (uid: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this?");
    if (confirmed) {
      removefromorganization(uid);
    }
  }

  return (
    <>
      <div style={{ marginTop: "10px", marginBottom: "10px", display: "flex", justifyContent: "flex-end" }}>
        <button
          className={styles.createUserBtn}
          onClick={() => {
            setOpen1(!open1)
          }}
        >
          Add Members
        </button>
      </div>
      <div className={styles.userListContainer}>
        <h2 className={styles.tableTitle}>Edit Group members for {groupName}</h2>
        {loading ? (<div style={{ width: "100%", height: "120px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Dots />
        </div>) : (
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
            {users.map((cuser: User, index: number) => {

              return (
                <tr key={cuser.id}>
                  <td data-label="Name">{cuser.first_name} {cuser.last_name}</td>
                  <td data-label="User Email">{cuser.email}</td>
                  <td data-label="Username">{cuser.username}</td>
                  <td data-label="Actions">
                    {index !== 0 && (
                      <button className={styles.deleteBtn} style={{ margin: "5px" }} onClick={() => {
                        confirmDelete(cuser.id);
                      }}>Delete</button>)}
                  </td>
                </tr>);
            })}
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

      <ModalDialog isOpen={open1} onClose={() => setOpen1(false)} >
        <div>
          <h2 style={{marginBottom:"8px"}}>Add members to Group</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup} style={{ overflow: "scroll" }}>
              <table className={styles.userTable}>
                <thead>
                  <tr>
                    {/* <th>Name</th> */}
                    <th>Email</th>
                    <th>Username</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allusers.map((cuser: User) => {

                    if (cuser.id === user.id || cuser.profile.role === "admin" || cuser.profile.role === "subadmin" || checkifinusers(cuser.id))
                      return;

                    return (
                      <tr key={cuser.id}>
                        {/* <td data-label="Name">{cuser.first_name} {cuser.last_name}</td> */}
                        <td data-label="Email">{cuser.email}</td>
                        <td data-label="Username">{cuser.username}</td>
                        <td data-label="Actions">
                          <input type="checkbox" value={cuser.id} />
                        </td>
                      </tr>);
                  })}
                </tbody>
              </table>
            </div>
            <div className={styles.formActions} style={{width:"fit-content", marginLeft:"auto",marginRight:"auto"}}>
              <button type="submit" style={{  fontSize: "14px",
                // height: "40px",
                // paddingLeft: "15px",
                // paddingRight:" 15px",
                width:"120px",
                padding:"8px",
                margin:"0"
              }}>Save</button>
              <button className={styles.cancelBtn} type="button" style={{marginLeft:"5px",width:"120px"}} onClick={() => setOpen1(false)}>
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
