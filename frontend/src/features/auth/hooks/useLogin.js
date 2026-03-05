import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { getUserByIdentity } from '../../../services/authService';

const useLogin = () => {
    const [formData, setFormData] = useState({ identity: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { identity, password } = formData;

        if (!identity || !password) {
            setError("Please fill in all fields");
            return;
        }

        setError('');
        setLoading(true);

        try {
            const result = await login(identity, password);

            if (result.success) {
                navigate('/');
                return;
            }

            const users = await getUserByIdentity(identity);

            if (users.items.length === 0) {
                throw new Error("User not found");
            }

            const fallbackResult = await login(users.items[0].email, password);
            if (fallbackResult.success) {
                navigate('/');
            } else {
                throw new Error("Invalid password");
            }
        } catch (error) {
            setError(error.message || "Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return { formData, error, loading, showPassword, setShowPassword, handleChange, handleSubmit };
};

export default useLogin;
