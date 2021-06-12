import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default class cat_create extends Component {
    state = {
        "title": '',
    }

    apiUrl = "http://localhost:8000/api/categories";

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    Cat_cr = event => {
        event.preventDefault();
        let token = Cookies.get('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const post = {
            ...this.state
        };
        if (this.state.title == '') {
            alert('Input title, please!');
        } else {
            axios.post(this.apiUrl, post)
                .then((res) => {
                    console.log(res);
                    this.props.history.push('/main');
                    window.location.reload();
                }).catch(error => {
                    alert('Input title, please!');
                })
        }

    }


    render() {
        return (
            <div>
                <form onSubmit={this.Cat_cr} class="shadow p-3 mb-5 bg-white rounded card m-5 card-body d-flex flex-column align-items-center text-center">
                    <h1 class="h3 mb-3 fw-normal">New category</h1>
                    <div class="form-floating">
                        <input type="text" class="form-control mb-3" name="title" onChange={this.onChange} id="floatingInput" placeholder="title"></input>
                        <label for="floatingInput">Title</label>
                    </div>
                    <button class="p-1 btn btn-lg btn-outline-primary" type="submit" style={{ "width": 160 + "px", "height": 40 + "px" }}>Create</button>
                </form>
            </div>
        )
    }
}