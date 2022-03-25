import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import validate from "./validate";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} type={type} placeholder={label} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
);

const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
    <ul>
        {fields.map((member, index) => {
            return (
                <li key={index}>
                    <button
                        type="button"
                        title="Remove Member"
                        onClick={() => fields.remove(index)}
                    />
                    <h4>Member #{index + 1}</h4>
                    <Field
                        name={`${member}.firstName`}
                        type="text"
                        component={renderField}
                        label="First Name"
                    />
                    <Field
                        name={`${member}.lastName`}
                        type="text"
                        component={renderField}
                        label="Last Name"
                    />
                </li>
            );
        })}
        <li>
            <button type="button" onClick={() => fields.push({})}>
                Add Member
            </button>
        </li>
    </ul>
);

const WizardFieldArray = props => {
    const { handleSubmit, previousPage, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="clubName"
                type="text"
                component={renderField}
                label="Club Name"
            />
            <FieldArray name="members" component={renderMembers} />
            <div>
                <button type="button" className="previous" onClick={previousPage}>
                    Previous
                </button>
                <button type="submit" disabled={submitting}>
                    Next
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
        </form>
    );
};

export default reduxForm({
    form: "wizard", //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
})(WizardFieldArray);
