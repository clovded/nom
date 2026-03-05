import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

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
            } else {
                throw result.error;
            }
        } catch (error) {
            setError(error?.message || "Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return { formData, error, loading, showPassword, setShowPassword, handleChange, handleSubmit };
};

export default useLogin;
