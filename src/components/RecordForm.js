import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';

class RecordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            title: '',
            amount: ''
        };
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        RecordsAPI.addRecord(this.state).then(res => {
            this.setState({
                date: '',
                title: '',
                amount: ''
            });
            this.props.handleAddRecord(res.data);
        });
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    isValid() {
        return !this.state.date || !this.state.title || !this.state.amount;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        name="date"
                        id="date"
                        value={this.state.date}
                        onChange={this.handleInputChange.bind(this)}
                    />
                </div>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        id="title"
                        value={this.state.title}
                        onChange={this.handleInputChange.bind(this)}
                    />
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input
                        name="amount"
                        id="amount"
                        value={this.state.amount}
                        onChange={this.handleInputChange.bind(this)}
                    />
                </div>
                <button type="submit" disabled={this.isValid()}>
                    Add Record
                </button>
            </form>
        );
    }
}

export default RecordForm;
