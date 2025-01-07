import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ fetchUsers, user = null, onEditComplete }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    // Populate the form if editing an existing user
    React.useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!name.trim()) {
            setError('Name field cannot be empty.');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid Gmail address.');
            return;
        }

        setError(''); // Clear error on valid input

        try {
            if (user) {
                // Update user
                await axios.put(`http://localhost:5000/api/users/${user.id}`, { name, email, phone });
                onEditComplete(); // Notify parent that editing is complete
            } else {
                // Create user
                await axios.post('http://localhost:5000/api/users', { name, email, phone });
            }
            fetchUsers();
            setName('');
            setEmail('');
            setPhone('');
        } catch (error) {
            console.error('Error saving user:', error);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
            {error && <p className="text-red-500 text-center font-medium">{error}</p>}

            <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-medium" htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 outline-none"
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-medium" htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email (e.g., user@gmail.com)"
                    className="border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 outline-none"
                />
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-medium" htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 outline-none"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300"
            >
                {user ? 'Update User' : 'Add User'}
            </button>
        </form>
    );
};

export default UserForm;
