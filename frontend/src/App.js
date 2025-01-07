import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import EditUserPage from './components/EditUserPage';

const App = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Router>
            <div className="container mx-auto p-4">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <UserForm fetchUsers={fetchUsers} />
                                <UserList users={users} fetchUsers={fetchUsers} />
                            </>
                        }
                    />
                    <Route
                        path="/edit/:id"
                        element={<EditUserPage fetchUsers={fetchUsers} />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
