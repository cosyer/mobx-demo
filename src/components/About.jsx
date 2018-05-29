import React, { Component } from 'react';
import '../styles/about.less';

export default class About extends Component {
    render() {
        return (
            <div className='aboutView'>
                <div className='about'>
                    <h1><img src='https://avatars0.githubusercontent.com/u/19321324?s=400&u=0ce423cb2b1308d05eae3d9950161d2937d2d815&v=4' alt="" /></h1>
                    <a href="https://github.com/cosyer/mobx-demo"><p> Github. </p></a>
                </div>
            </div>
        )
    }
}