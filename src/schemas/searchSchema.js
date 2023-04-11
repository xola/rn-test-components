import { object, string, setLocale } from 'yup';

setLocale({
    mixed: {
        required: 'Required',
    },
});

const searchSchema = object().shape({
    searchText: string().required('Please enter search term').min(3, 'Please enter at least 3 characters'),
});

export default searchSchema;
