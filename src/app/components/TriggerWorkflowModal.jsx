import React, {Component} from 'react'
import {Button, Form, Message, Modal, Select} from 'semantic-ui-react'

const default_form = {
    workflow: null,
    instance: '',
    meta: '{}',
    payload: '{}'
}

export default class TriggerWorkflowModal extends Component {
    state = {
        open: false,
        form: default_form,
        errors: []
    }

    toggle(open) {
        this.setState({ open, form: default_form, errors: [] })
    }

    handleChange(e, {name, value}) {
        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
        })
    }

    submit() {
        const errors = []
        const form = this.state.form
        if (!form.workflow) errors.push('Must select a workflow.')
        if (!form.instance) errors.push('Must provide instance id.')
        let meta, payload;
        try {
            meta = JSON.parse(form.meta)
        } catch(e) {
            errors.push('Meta must be valid json.')
        }
        try {
            payload = JSON.parse(form.payload)
        } catch(e) {
            errors.push('Payload must be valid json.')
        }
        if (errors.length) {
            this.setState({errors})
        } else {
            this.props.submit({...form, meta, payload})
            this.toggle(false)
        }
    }

    render() {
        const options = Object.keys(this.props.workflows).map(w => ({key: w, text: w, value: w}))
        const { form, errors } = this.state

        return (
            <div>
                <Button onClick={this.toggle.bind(this, true)}>Start a workflow</Button>
                <Modal open={this.state.open} dimmer={null}>
                    <Modal.Header>Start a workflow</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            {(errors.length || null) &&  <Message negative><p>{errors.join(' ')}</p></Message>}
                            <Form>
                                <Form.Field>
                                  <Form.Field name="workflow" control={Select} value={form.workflow} onChange={this.handleChange.bind(this)} label='Workflow' options={options} placeholder='Select a workflow...' />
                                </Form.Field>
                                <Form.Field>
                                  <Form.Input name="instance"  label="Instance ID" value={form.instance} onChange={this.handleChange.bind(this)} placeholder='Unique instance id...' />
                                </Form.Field>
                                <Form.Field>
                                  <Form.TextArea name="meta" label='Meta' value={form.meta} onChange={this.handleChange.bind(this)}/>
                                </Form.Field>
                                <Form.Field>
                                  <Form.TextArea name="payload" label='Payload' value={form.payload} onChange={this.handleChange.bind(this)}/>
                                </Form.Field>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.toggle.bind(this, false)}>Cancel</Button>
                        <Button positive onClick={this.submit.bind(this)}>Start</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}