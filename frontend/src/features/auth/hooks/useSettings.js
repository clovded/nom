import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { api } from '../../../services/api';

const useSettings = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            const updated = await api('/api/auth/me', {
                method: 'PATCH',
                body: JSON.stringify({ currentPassword, newUsername, newPassword, newPasswordConfirm })
            });
            setCurrentUser(updated);
            setSuccess('Updated successfully');
            setCurrentPassword('');
            setNewPassword('');
            setNewPasswordConfirm('');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        currentUser,
        currentPassword, setCurrentPassword,
        newUsername, setNewUsername,
        newPassword, setNewPassword,
        newPasswordConfirm, setNewPasswordConfirm,
        error,
        success,
        isLoading,
        handleSubmit
    };
};

export default useSettings;
