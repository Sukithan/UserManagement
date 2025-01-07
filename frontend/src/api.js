import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Backend server URL

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Create a new user
export const createUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users`, user);
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update a user
export const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, user);
    return response;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
