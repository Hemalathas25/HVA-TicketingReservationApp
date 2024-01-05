import bcrypt from 'bcryptjs';

const user = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Hema',
        email: 'hema@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Hyperverge',
        email: 'hyper@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
];

export default user;