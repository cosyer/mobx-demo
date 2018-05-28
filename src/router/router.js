import TodoView from '../components/TodoView';
import About from '../components/About';

export default [
    {
        path: '/',
        name: 'TodoList',
        component: TodoView
    },
    {
        path: '/page/about',
        name: 'About',
        component: About
    }
]