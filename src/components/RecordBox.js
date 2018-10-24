import React, { Component } from 'react';

class RecordBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: this.props.records
        };
    }

    calcCredit() {
        return this.props.records.reduce((prev, curr) => {
            return Number(curr.amount > 0) ? Number(prev) + Number(curr.amount) : Number(prev);
        }, 0);
    }

    calcDebit() {
        return this.props.records.reduce((prev, curr) => {
            return Number(curr.amount <= 0) ? Number(prev) + Number(curr.amount) : Number(prev);
        }, 0);
    }

    render() {
        return (
            <div>
                <div>
                    <span>Credit: </span>
                    <span>{this.calcCredit()}</span>
                </div>
                <div>
                    <span>Debit: </span>
                    <span>{this.calcDebit()}</span>
                </div>
                <div>
                    <span>Balance: </span>
                    <span>{this.calcCredit() + this.calcDebit()}</span>
                </div>
            </div>
        );
    }
}

export default RecordBox;
