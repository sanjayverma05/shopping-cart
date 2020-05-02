import React, { Component } from 'react';

class LazyLoad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Module: null
        }
    }
    componentDidMount() {
        this.props.load()
            .then((component) => {
                this.setState(() => ({
                    Module: component.default ? component.default : component
                }))
            })
    }
    render() {
        let { Module } = this.state;
        return Module ? <Module {...this.props} /> : null
    }
}


export default LazyLoad;