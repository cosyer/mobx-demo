import React, {Component} from 'react';
import avatar from '../images/avatar.jpg';
import '../styles/about.less';

export default class About extends Component{
    render(){
        return(
            <div className='aboutView'>
                <div className='about'>
                    <h1><img src={avatar} alt=""/></h1>
                    <a href="https://github.com/zhaoyu69/mobx-demo"><p> Github. </p></a>
                </div>
            </div>
        )
    }
}