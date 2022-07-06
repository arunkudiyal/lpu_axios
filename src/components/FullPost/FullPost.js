import React, { Component } from 'react';
import axios from 'axios'

import './FullPost.css';

class FullPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadedPost: null
        }
    }

    // Side-Effect
    componentDidUpdate() {
        if(this.state.loadedPost === null || this.state.loadedPost.id !== this.props.id) {
            axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                .then( result => {
                    this.setState({loadedPost: result.data})
                })
                .catch( error => console.log(error) )
        }
    }

    deletePersonHandler = (id) => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + id)
            .then(result => {
                console.log(`Made delete request`)
                console.log(result)
            })
            .catch(error => console.log(error))
    }

    render () {
        let post = <p style={ {textAlign: 'center'} }>No Post is selected yet!</p>
        if(this.state.id) {
            post = <p style={ {textAlign: 'center'} }>Loading...</p>
        }
        if(this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={() => this.deletePersonHandler(this.props.id)} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }
}

export default FullPost;