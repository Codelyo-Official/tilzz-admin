import React from "react";
import "./users.css";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", password: "abcdefg", active: true, role: "admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", password: "abcdefg", active: false, role: "user" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", password: "abcdefg", active: true, role: "sub-admin" },
];

const UserList = () => {
  return (
    <>
    <div style={{marginTop:"10px",marginBottom:"10px", display:"flex",justifyContent:"flex-end"}}>
      <button style={{marginRight:"20px", border:"solid 1px black", height:"40px",paddingLeft:"15px",paddingRight:"15px",borderRadius:"20px",fontSize:"14px"}}>Create New User</button>
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
    </>
  );
};

export default UserList;

