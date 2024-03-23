import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import './Admin.css'
import urlApi from '../../configAPI/UrlApi';
import axios from 'axios';

function Admin() {
  const [creatorUsers, setCreatorUsers] = useState();
  const [productCount, setProductCount] = useState();


  useEffect(() => {
    async function fetchRegisteredUsers() {
      try {
        const response = await axios.get(`${urlApi}/api/User/users`);
        const users = response.data;

        const creatorCount = users.filter(user => user.roles.includes('CREATOR')).length;

        const productsResponse = await axios.get(`${urlApi}/api/Artwork/get-all`);
        const products = productsResponse.data;

        setProductCount(products.length);
        setCreatorUsers(creatorCount);
      } catch (error) {
        console.error('Error fetching registered users:', error);
      }
    }

    fetchRegisteredUsers();
  }, []);
  return (
    <main className='main-container'>
      <div className='main-title'>
        <h4>DASHBOARD</h4>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <div className='text-ad'>
            <h3>PRODUCTS</h3>
            <p>{productCount}</p> {/* Hiển thị số lượng sản phẩm */}
          </div>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <BsPeopleFill className='card_icon' />
          </div>
          <div className='text-ad'>
            <h3>CEARTOR</h3>
            <p>{creatorUsers}</p>
          </div>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <BsFillBellFill className='card_icon' />
          </div>
          <div className='text-ad'>
            <h3>REPORTS</h3>
            <p>42</p>
          </div>
        </div>
      </div>
      <div class="table-data">
        <div class="order">
          <div class="head">
            <h3>Recent Orders</h3>
            <i class='bx bx-search' ></i>
            <i class='bx bx-filter' ></i>
          </div>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Date Order</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src="/assets/image/Land.png" />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td><span class="status completed">Completed</span></td>
              </tr>
              <tr>
                <td>
                  <img src="/assets/image/Land.png" />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td><span class="status pending">Pending</span></td>
              </tr>
              <tr>
                <td>
                  <img src="/assets/image/Land.png" />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td><span class="status process">Process</span></td>
              </tr>
              <tr>
                <td>
                  <img src="/assets/image/Land.png" />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td><span class="status pending">Pending</span></td>
              </tr>
              <tr>
                <td>
                  <img src="/assets/image/Land.png" />
                  <p>John Doe</p>
                </td>
                <td>01-10-2021</td>
                <td><span class="status completed">Completed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default Admin