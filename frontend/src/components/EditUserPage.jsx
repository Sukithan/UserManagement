import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserForm from './UserForm';

const EditUserPage = ({ fetchUsers }) => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const handleEditComplete = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-semibold text-center text-blue-800 mb-4">Edit User</h1>
                <p className="text-center text-gray-600 mb-6">
                    Update the user details below. Fields marked with <span className="text-red-500">*</span> are mandatory.
                </p>
                <UserForm
                    fetchUsers={fetchUsers}
                    user={state.user}
                    onEditComplete={handleEditComplete}
                />
            </div>
        </div>
    );
};

export default EditUserPage;
