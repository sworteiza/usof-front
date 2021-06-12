import React, { Component, createElement } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import createComment from './create_comment';

export default class Post_main extends Component {
    apiPost = "http://localhost:8000/api/posts";
    apiUser = "http://localhost:8000/api/users";
    apiComment = "http://localhost:8000/api/comments";
    state = {
        post: [],
        cat: [],
        comment: [],
        imagefile: [],
        like: [],
    }

    like_create = event => {
        event.preventDefault();
        let token = Cookies.get('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        console.log(event);
        axios.post(this.apiComment + '/' + event.nativeEvent.path[3].id + '/like', { "type": "like" })
            .then((res) => {
                console.log(res);
                window.location.reload();
            })

    }
    componentDidMount() {
        let token = Cookies.get('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.get(this.apiPost + "/" + Cookies.get('title_post'))
            .then(res => {
                const post = res.data;
                this.setState({ post });
                console.log(res.data);
            })
        axios.get(this.apiPost + "/" + Cookies.get('title_post') + '/categories')
            .then(res => {
                let tmp = res.data[0];
                for (let i = 0; i == i; i++) {
                    if (tmp[i] !== undefined) {
                        document.getElementById('category').innerHTML = tmp[i].title;
                        break;
                    }
                }

            })
        axios.get(this.apiPost + "/" + Cookies.get('id_post') + '/comments')
            .then(res => {
                console.log(res.data);
                const comment = res.data;
                let i = 0;
                let j = 0;
                comment.map((com) => {
                    axios.get(this.apiUser + "/" + com.author + "/avatar", { responseType: "blob" })
                        .then(resp => {
                            const prof_pic = URL.createObjectURL(resp.data);
                            document.getElementById(i).setAttribute("src", prof_pic);
                            i++;
                        })
                    axios.get(this.apiComment + "/" + com.id + "/like")
                        .then(resp_1 => {
                            console.log(resp_1.data);
                            document.getElementsByName(j)[0].innerHTML = resp_1.data.length + ' Like(s)';
                            console.log(document.getElementById(j));
                            j++;
                        })
                })
                comment.count = comment.length;
                console.log(comment.length);
                this.setState({ comment });
            })
        axios.get(this.apiPost + "/" + Cookies.get('id_post') + "/like")
            .then(res => {
                console.log(res.data);
                const like = res.data;
                this.setState({ like });
            })
    }
    render() {
        return (
            <div>
                <div class="shadow-sm p-3 mb-5 bg-white rounded card m-5 card-body d-flex flex-column">
                    <div class="card-body">
                        <div class="media mb-3">
                            <div class="media-body ml-3">
                                <h3>{this.state.post.map(info => info.title)}</h3>
                                <div class="text-muted big">{this.state.post.map(info => info.author)}</div>
                                <div id="category" class="text-muted small">{this.state.cat.map(info => info.title)}</div>
                            </div>
                        </div>
                        <p>{this.state.post.map(info => info.content)}</p>
                    </div>
                    <div class="card-footer">
                        <a class="d-inline-block text-muted ml-3 p-2"> {this.state.like.length} Likes </a>
                        <a class="d-inline-block text-muted ml-3"> {this.state.comment.count} Comment(s) </a>

                    </div>
                </div>

                <div>
                    <h3 class="" style={{ marginLeft: "3rem" }}>Answers:</h3>
                    <Router>
                        <Link to="/create_comment"><button type="button" class="btn btn-outline-info" style={{ marginLeft: "3rem" }}>Create comment</button></Link>
                        <Switch>
                            <Route path='/create_comment' component={createComment} />
                        </Switch>
                    </Router>
                    <div>
                        {this.state.comment.map((comm, index) => (
                            <div class="d-flex flex-row m-5">
                                <img id={index} class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15" style={{ width: "50px", height: "50px" }}></img>
                                <div id={comm.id} class="col-md-8 shadow-sm p-3 mb-5 bg-white rounded card card-body d-flex flex-column" style={{ marginLeft: "1rem" }}>
                                    <div class="media g-mb-30 media-comment">
                                        <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                                            <div class="g-mb-15">
                                                <h5 key={index} class="h5 g-color-gray-dark-v1 mb-0">{comm.author}</h5>
                                                <span key={index} class="g-color-gray-dark-v4 g-font-size-12 text-muted">{comm.created_at.substr(0, 10)}</span>
                                            </div>

                                            <p key={index}>{comm.content}</p>
                                            <button name={index} class="btn btn-link d-inline-block ml-3 p-2" style={{ float: "right" }} onClick={this.like_create}></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        )
    }
}



