import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default class Post_create extends Component {
    state = {
        "title": '',
        "content": '',
        "category": '',
    }

    apiUrl = "http://localhost:8000/api/posts";

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    Post_cr = event => {
        event.preventDefault();
        let token = Cookies.get('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const post = {
            ...this.state
        };
        if (this.state.title == '' || this.state.content == '' || this.state.category == '') {
            alert('All data were not given or no such category!');
        } else {
            axios.post(this.apiUrl, post)
                .then((res) => {
                    console.log(res);
                    this.props.history.push('/main');
                    window.location.reload();
                }).catch(error => {
                    alert('All data were not given or no such category!');
                })
        }

    }



    render() {
        return (
            <div >
                <form onSubmit={this.Post_cr} class="shadow p-3 mb-5 bg-white rounded card m-5 card-body d-flex flex-column align-items-center text-center">
                    <h1 class="h3 mb-3 fw-normal">Your post's info</h1>
                    <div class="form-floating">
                        <input type="text" class="form-control mb-3" name="title" onChange={this.onChange} id="floatingInput" placeholder="title"></input>
                        <label for="floatingInput">Title</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" class="form-control mb-3" name="category" onChange={this.onChange} id="floatingInput" placeholder="category"></input>
                        <label for="floatingInput">Category</label>
                    </div>
                    <div class=" form-floating">
                        <textarea class="form-control mb-3" id="exampleFormControlTextarea1" rows="3" name="content" onChange={this.onChange} placeholder="content"></textarea>
                        <label for="floatingPassword">Content</label>
                    </div>
                    <button class="p-1 btn btn-lg btn-outline-primary" type="submit" style={{ "width": 160 + "px", "height": 40 + "px" }}>Create</button>


                </form>
            </div>
        );
    }

}
