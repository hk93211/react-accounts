import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';

class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.record.date,
            title: this.props.record.title,
            amount: this.props.record.amount,
            isEdit: false
        };
    }

    handleToggle() {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    handleUpdate() {
        console.log(this.state);

        console.log(this.refs.date.value);
        console.log(this.refs.title.value);
        console.log(this.refs.amount.value);

        let params4update = {
            date: this.refs.date.value,
            title: this.refs.title.value,
            amount: this.refs.amount.value
        };

        const id = this.props.record.id;
        RecordsAPI.updateRecord(id, params4update).then(() => {
            this.setState({ isEdit: false });
            this.props.handleUpdateRecord(id, params4update);
        });
    }

    handleDelete() {
        const id = this.props.record.id;
        RecordsAPI.deleteRecord(id).then(() => {
            this.props.handleDeleteRecord(id);
        });
    }

    renderEditRow() {
        return (
            <tr>
                <td>
                    <input defaultValue={this.state.date} name="date" ref="date" />
                </td>
                <td>
                    <input defaultValue={this.state.title} name="title" ref="title" />
                </td>
                <td>
                    <input defaultValue={this.state.amount} name="amount" ref="amount" />
                </td>
                <td>
                    <button onClick={this.handleUpdate.bind(this)}>Update</button>
                    <button onClick={this.handleToggle.bind(this)}>Cancel</button>
                </td>
            </tr>
        );
    }

    renderCommonRow() {
        return (
            <tr>
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{this.props.record.amount}</td>
                <td>
                    <button onClick={this.handleToggle.bind(this)}>Edit</button>
                    <button onClick={this.handleDelete.bind(this)}>Delete</button>
                </td>
            </tr>
        );
    }

    render() {
        if (this.state.isEdit) {
            return this.renderEditRow();
        } else {
            return this.renderCommonRow();
        }
    }
}

export default Record;
