import { api } from './api';

export const createUser = async ({ username, password, passwordConfirm }) => {
    return api('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password, passwordConfirm })
    });
};
