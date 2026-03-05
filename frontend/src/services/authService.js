import { pb } from './pocketbase';

export const getUserByIdentity = async (identity) => {
    return pb.collection('users').getList(1, 1, {
        filter: `username = "${identity}" || email = "${identity}"`,
        $autoCancel: false
    });
};

export const createUser = async ({ email, username, password, passwordConfirm }) => {
    return pb.collection('users').create({ email, username, password, passwordConfirm });
};
