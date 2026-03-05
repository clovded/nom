import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../services/authService';

const useRegistration = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!email || !username || !password) {
            setError("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        if (password !== passwordConfirm) {
            setError("Passwords don't match");
            setIsLoading(false);
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            setIsLoading(false);
            return;
        }

        try {
            await createUser({ email, username, password, passwordConfirm });
            alert("User successfully created!");
            navigate('/login');
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email, setEmail,
        username, setUsername,
        password, setPassword,
        passwordConfirm, setPasswordConfirm,
        error,
        showPassword, setShowPassword,
        isLoading,
        handleSubmit
    };
};

export default useRegistration;
