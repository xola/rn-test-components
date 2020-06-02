import { object, string, setLocale } from 'yup';

setLocale({
    mixed: {
        required: 'Required',
    },
});

const searchSchema = object().shape({
    searchText: string().required('Please enter search term'),
});

export default searchSchema;
