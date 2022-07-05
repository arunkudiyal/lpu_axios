import React, { Component } from 'react';

import axios from 'axios'

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    // API Call to get all posts
    componentDidMount = () => {
        // Axios call to a API to fetch the data
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then( response => {
                const posts = response.data.slice(0, 8)
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Arun Kudiyal'
                    }
                })
                this.setState( {posts: updatedPosts} )
            })
            .catch( err => console.log(err) )
    }

    render () {
        return (
            <div>
                <section className="Posts">
                    {
                        this.state.posts.map( post => <Post key={post.id} title={post.title} author={post.author} /> )
                    }
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;