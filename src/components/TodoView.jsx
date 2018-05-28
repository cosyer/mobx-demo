import React, {Component} from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import '../styles/todo.less';

export default class TodoView extends Component{
    render(){
        return(
            <div className='todoView'>
                <AddTodo />
                <TodoList />
            </div>
        )
    }
}