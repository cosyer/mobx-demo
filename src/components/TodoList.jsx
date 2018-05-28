import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Popconfirm } from 'antd';

@inject('store')
@observer
export default class TodoList extends Component{
    componentDidMount(){
        const { store } = this.props;
        store.fetchTodos();
    }
    render(){
        const { store } = this.props;
        const columns = [{
            title: 'todo',
            dataIndex: 'todo',
        },{
            title: 'action',
            dataIndex: 'action',
            width: 100,
            render:  (text, record) => {
                return(
                    <Popconfirm title="确认删除?" onConfirm={() => store.remove(record.key)}>
                        <a>删除</a>
                    </Popconfirm>
                )
            }
        }];
        const rowSelection = {
            selectedRowKeys: store.selectedRowKeys,
            onChange: store.onSelectChange,
        };
        return(
            <div>
                <Table
                    dataSource={store.todos.toJS()}
                    columns={columns}
                    rowSelection={rowSelection}
                    loading={store.loading}
                    pagination={false}
                    size='middle'
                />
                <p style={{marginTop:'15px'}}>{`Total ${store.total} items`}</p>
            </div>
        )
    }
}