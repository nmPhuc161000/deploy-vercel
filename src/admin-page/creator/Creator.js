import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Creator.css';
import urlApi from '../../configAPI/UrlApi';
import { FaLock, FaUnlock } from 'react-icons/fa';

function Creator() {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          storedUsers = JSON.parse(storedUsers);
          setUsers(storedUsers);
        } else {
          const response = await axios.get(`${urlApi}/api/User/users`);
          const allUsers = response.data;
          const creatorUsers = allUsers.filter(user => user.roles.includes('CREATOR'));
          setUsers(creatorUsers);
          setIsAdmin(allUsers.some(user => user.roles.includes('ADMIN')));
          localStorage.setItem('users', JSON.stringify(creatorUsers));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);
  const token = localStorage.getItem("token");
  const handleStatusChange = async (userId, isActive) => {
    try {
      await axios.patch(`${urlApi}/api/Admin/update-status-user?user_Id=${userId}`, { isActive }, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return { ...user, isActive: !isActive };
        }
        return user;
      });
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  return (
    <main className='main-container'>
      <div className="main-title">
        <h4>CREATOR</h4>
      </div>
      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Registered Users</h3>
            <i className='bx bx-search'></i>
            <i className='bx bx-filter'></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Date Registered</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.nickName}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</td>
                  <td>
                    <button onClick={() => handleStatusChange(user.id, user.isActive)}>
                      {user.isActive ? <FaLock /> : <FaUnlock />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Creator;
