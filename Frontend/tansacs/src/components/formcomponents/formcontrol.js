import Input from "./inputfield";
import Select from './selectfeild';
import FileInput from './filefeild'
import PasswordField from "./passwordfeild";

function FormikControl(props) {

    const { control, ...rest } = props
    switch (control) {
        case 'input':
        return <Input {...rest} />
        case 'password':
        return <PasswordField {...rest} />
        case 'file':
        return <FileInput {...rest} />
        // case 'textarea':
        // return <Textarea {...rest} />
        case 'select':
        return <Select {...rest} />
        // case 'radio':
        // return <RadioButtons {...rest} />
        // case 'checkbox':
        // return <CheckboxGroup {...rest} />
        // case 'date':
        // return <DatePicker {...rest} />
        // case 'chakraInput':
        // return <ChakraInput {...rest} />
        default:
        return null
    }
}

export default FormikControl;