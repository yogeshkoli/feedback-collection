import _ from 'lodash';
import React, { Component } from "react";
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validatedEmails from '../../utils/validateEmails';
import formFields from './formFields';
import Button from '@material-ui/core/Button';

class SurveyForm extends Component {

    renderFields() {
        return _.map(formFields, ({ name, label }) => {
            return <Field
                key={name}
                type="text"
                label={label}
                name={name}
                component={SurveyField}
            />
        });
    }

    render() {
        return (
            <div>
                <h5>Create Survey</h5>
                <hr />
                <form onSubmit={this.props.handleSubmit((values) => this.props.onSurveySubmit())}>
                    {this.renderFields()}

                    <Link to="/surveys">
                        <Button variant="contained">Cancel</Button>
                    </Link>
                    <Button variant="contained" color="primary" type="submit">
                        Next
                    </Button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validatedEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = `You must provide ${name}`;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);