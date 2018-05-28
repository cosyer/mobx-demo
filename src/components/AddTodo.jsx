import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Input, Popconfirm } from 'antd';
import '../styles/todo.less';

@inject('store')
@observer
export default class AddTodo extends Component{
    render(){
        const { store } = this.props;
        return (
            <div>
                <Input
                    placeholder="添加todolist"
                    onChange={(e) => store.newtodo = e.target.value}
                    defaultValue={store.newtodo}
                    style={{width:'200px'}}
                />
                <Button type="primary" onClick={store.AddTodo} className='btn'>添加</Button>
                <Popconfirm title="确认删除?" onConfirm={() => store.removeSelected()}>
                    <Button type="danger" className='btn'>删除选中</Button>
                </Popconfirm>
            </div>
        )
    }
}