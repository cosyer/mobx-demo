import { observable, computed, action } from 'mobx';
import { message } from 'antd';
class AppStore {
    @observable todos = []; //todos列表
    @observable newtodo = ""; //新添加的todo
    @observable selectedRowKeys = []; //选择行的key
    @observable loading = true; //Table-loading
    @observable _key = 0; //key
    @observable total = 0; //数据量

    @action fetchTodos() {
        fetch('http://localhost:8888/api/todos', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                current: this.current,
                pageSize: this.pageSize
            })
        })
            .then((response) => {
                // console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    this.total = data.count;
                    this._key = data.data.length === 0 ? 0 : data.data[data.data.length - 1].key;
                    this.todos = data.data;
                    this.loading = false;
                }.bind(this));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    @action fetchTodoAdd() {
        fetch('http://localhost:8888/api/todos/add', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                key: this._key,
                todo: this.newtodo,
            })
        })
            .then((response) => {
                // console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    /*成功添加 总数加1 添加失败 最大_key恢复原有*/
                    if (data.status) {
                        this.total += 1;
                        this.todos.push({
                            key: this._key,
                            todo: this.newtodo,
                        });
                        message.success('添加成功！');
                    } else {
                        this._key -= 1;
                        message.error('添加失败！');
                    }
                }.bind(this));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    @action fetchTodoRemove(keyArr) {
        fetch('http://localhost:8888/api/todos/remove', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                key: keyArr
            })
        })
            .then((response) => {
                console.log(response);
                response.json().then(function (data) {
                    // console.log(data);
                    if (data.status) {
                        if (keyArr.length > 1) {
                            this.todos = this.todos.filter(item => this.selectedRowKeys.indexOf(item.key) === -1);
                            this.selectedRowKeys = [];
                        } else {
                            this.todos = this.todos.filter(item => item.key !== keyArr[0]);
                        }
                        this.total -= keyArr.length;
                        message.success('删除成功！');
                    } else {
                        message.error('删除失败！');
                    }
                }.bind(this));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //添加
    @action AddTodo = () => {
        this._key += 1;
        this.fetchTodoAdd();
    };

    //checkbox选择
    @action onSelectChange = (selectedRowKeys) => {
        this.selectedRowKeys = selectedRowKeys;
    };

    //删除单个
    @action remove(key) {
        this.fetchTodoRemove([key]);
    }

    //删除选择
    @action removeSelected() {
        this.fetchTodoRemove(this.selectedRowKeys);
    }

    //计算长度
    @computed get TodoListCount() {
        return this.todos.length;
    }

}
export default AppStore;