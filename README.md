# 技术栈 #

react + react-router(v4) + mobx + webpack + express + mongodb
 
# 效果图 #

![来自简书](http://upload-images.jianshu.io/upload_images/7429221-3f1f180b0de48d65.gif?imageMogr2/auto-orient/)

# 快速开始 #

> git clone git@github.com:cosyer/mobx-demo.git
> 
> npm install

1、 开启mongodb服务

[mongodb的安装与配置](https://jingyan.baidu.com/article/d5c4b52bef7268da560dc5f8.html)

关键：D:/mongodb/bin>mongod --dbpath D:\mongodb\data\db

2、 开启server服务

> npm run server

3、 运行项目

> npm start

---
#### React是一个状态机，由开始的初始状态，通过与用户的互动，导致状态变化，从而重新渲染UI。
#### React 提供了优化UI渲染的机制， 这种机制就是通过使用虚拟DOM来减少昂贵的DOM变化的数量。
#### MobX 提供了优化应用状态与 React 组件同步的机制，这种机制就是使用响应式虚拟依赖状态图表，它只有在真正需要的时候才更新并且永远保持是最新的。
#### redux缓存机制 时间回溯

1. 安装
~~~
npm install --save mobx mobx-react
~~~
2. 核心概念
- state(状态) 
状态是驱动应用的数据。
- observable(value) && @observable 
Observable 值可以是JS基本数据类型、引用类型、普通对象、类实例、数组和映射。其修饰的state会暴露出来供观察者使用。
- observer(观察者)
被observer修饰的组件，将会根据组件内使用到的被observable修饰的state的变化而自动重新渲染。
- action(动作)
只有在 actions 中，才可以修改 Mobx 中 state 的值。
action-->state-->view
- computed
计算值(computed values)是可以根据现有的状态或其它计算值衍生出的值。(可以看成公式)
getter：获得计算得到的新state并返回。
setter： 不能用来直接改变计算属性的值，但是它们可以用来作“逆向”衍生。
- autorun
这通常是当你需要从反应式代码桥接到命令式代码的情况，例如打印日志、持久化或者更新UI的代码。
- 如果你有一个函数应该自动运行，但不会产生一个新的值，请使用autorun。 其余情况都应该使用 computed。
- reactions
Reactions 和计算值很像，但它不是产生一个新的值，而是会产生一些副作用，比如打印到控制台、网络请求、递增地更新 React 组件树以修补DOM、等等。 简而言之，reactions 在 响应式编程和命令式编程之间建立沟通的桥梁。

~~~
// component
import {inject, observer} from "mobx-react";

// 观察者 注入store
@inject("store") @observer

this.props.store.xxStore.num
this.props.store.xxStore.get()
this.props.store.xxStore.total

// homeStore

@observable num;
construtor(){
    this.name=''
    this.items=[]
}

@computed get total() {
    return this.items.length;
 }
  
@action plus=()=>{
    this.num+=1
}

autorun((e)=>{})

const homeStore =new HomeStore()
export {homeStore}
~~~

~~~
switch
router render={(props)=><Item {...props}/>}
router component={Index}
react-route-dom
withRouter
Linking
// Provider 传递stores
Privider store={stores}
create-react-app react-scripts
~~~
基本就这两种方法:immutable/observable
mobx:oop
redux:函数式