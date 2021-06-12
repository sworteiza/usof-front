import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default class Comment_create extends Component {
    state = {
        "content": '',
    }
    ///posts/{id}/comments
    apiUrl = "http://localhost:8000/api/posts";

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    Comment_cr = event => {
        event.preventDefault();
        let token = Cookies.get('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const comment = {
            ...this.state
        };
        if (this.state.content == '') {
            alert('All data were not given!');
        } else {
            axios.post(this.apiUrl + '/' + Cookies.get('id_post') + '/comments', comment)
                .then((res) => {
                    console.log(res);
                    this.props.history.push('/post_main/' + Cookies.get('title_post'));
                    window.location.reload();
                }).catch(error => {
                    alert('All data were not given!');
                })
        }

    }



    render() {
        return (
            <div >
                <form onSubmit={this.Comment_cr} class="shadow p-3 mb-5 bg-white rounded card m-5 card-body d-flex flex-column align-items-center text-center">
                    <h1 class="h3 mb-3 fw-normal">Your comment's info</h1>
                    <div class=" form-floating">
                        <textarea class="form-control mb-3" id="exampleFormControlTextarea1" cols="100" rows="3" name="content" onChange={this.onChange} placeholder="content"></textarea>
                        <label for="floatingPassword">Content</label>
                    </div>
                    <button class="p-1 btn btn-lg btn-outline-primary" type="submit" style={{ "width": 160 + "px", "height": 40 + "px" }}>Create</button>
                </form>
            </div>
        );
    }

}