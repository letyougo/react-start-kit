import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'antd/dist/antd.min.css'
import {Table} from 'antd'
import request from 'superagent'

var api = 'http://101.200.129.112:9527/react1/student/'

const colnums = [
    {title:'id',dataIndex:'id'},
    {title:'name',dataIndex:'name'},
    {title:'age',dataIndex:'age'},
    {title:'sex',dataIndex:'sex'},
    {title:'single',dataIndex:'single',render:(single)=><span>{single?'单身狗':'恩爱狗'}</span>}

]

var App = React.createClass({
    getInitialState(){
        return {
            items :[]
        }
    },
    render(){
        return (
            <div>
                <h3>ryan</h3>
                <Table dataSource={this.state.items} columns={colnums}/>
            </div>
        )
    },
    componentDidMount(){
        var that = this
        request
            .get(api)
            .end(function (err, res) {
                console.log(res.body)
                res.body = res.body.map(function (obj) {
                    obj.key = obj.id
                    return obj
                })
                that.setState({
                    items:res.body
                })
            })
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
