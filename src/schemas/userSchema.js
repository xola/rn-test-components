import { object, string, setLocale } from 'yup';

setLocale({
    mixed: {
        required: 'Required',
    },
});

const userSchema = object().shape({
    password: string().required('Password is required'),

    username: string()
        .trim()
        .required('Username is required')
        .email('Invalid email'),
});

export default userSchema;
