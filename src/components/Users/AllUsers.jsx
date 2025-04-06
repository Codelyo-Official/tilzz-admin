import React from "react";
import "./users.css";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", active: true, role: "admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", active: false, role: "user" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", active: true, role: "superadmin" },
];

const UserList = () => {
  return (
    <div className="user-list-container">
      <h2 className="table-title">User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
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
  );
};

export default UserList;

