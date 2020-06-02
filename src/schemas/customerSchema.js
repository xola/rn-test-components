import { object, string, setLocale } from 'yup';

setLocale({
    mixed: {
        required: 'Required',
    },
});

const customerSchema = object().shape({
    customerName: string().required('Customer name is required'),

    customerEmail: string()
        .required('Customer email is required')
        .email('Must be a valid email'),
});

export default customerSchema;
