import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";
// import TextField from '@mui/material/TextField';

class WizardFormFirstPage extends React.Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Field
                    name="firstName"
                    type="text"
                    component={renderField}
                    label="First Name"
                />
                <Field
                    name="lastName"
                    type="text"
                    component={renderField}
                    label="Last Name"
                />
                <div>
                    <button type="submit" className="next">
                        Next
                    </button>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: "wizard", //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
})(WizardFormFirstPage);
