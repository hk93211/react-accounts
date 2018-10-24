import React, { Component } from 'react';
import Record from './Record';
import RecordForm from './RecordForm';
import RecordBox from './RecordBox';
import * as RecordsAPI from '../utils/RecordsAPI';

class Records extends Component {
    constructor() {
        super();
        this.state = {
            date: '',
            title: '',
            amount: '',
            records: [],
            isLoading: false
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        RecordsAPI.getRecords().then(res => {
            this.setState({
                records: res.data,
                isLoading: false
            });
        });
    }

    handleRecordAdd(record) {
        this.setState({
            records: [...this.state.records, record]
        });
    }

    handleRecordUpdate(id, record) {
        let newRecords = this.state.records.map(item => {
            if (item.id === id) {
                return record;
            }
            return item;
        });
        this.setState({ records: newRecords });
    }

    handleRecordDelete(id) {
        let newRecords = this.state.records.filter(item => item.id !== id);
        this.setState({ records: newRecords });
    }

    render() {
        const { records, isLoading } = this.state;
        const loadingComponent = <h1>isLoading...</h1>;
        const recordsComponent = (
            <div>
                <h1>Records</h1>
                <RecordBox records={this.state.records} />
                <RecordForm handleAddRecord={this.handleRecordAdd.bind(this)} />
                <table border="1" className="table table-border">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map(record => (
                            <Record
                                record={record}
                                key={record.id}
                                handleUpdateRecord={this.handleRecordUpdate.bind(this)}
                                handleDeleteRecord={this.handleRecordDelete.bind(this)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
        return <div>{isLoading ? loadingComponent : recordsComponent}</div>;
    }
}

export default Records;
