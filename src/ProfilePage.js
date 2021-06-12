import React, { Component, createElement } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import createPost from './post_create';
import createCat from './cat_create';



export default class ProfilePage extends Component {
    apiUrl = "http://localhost:8000/api/auth/logout";
    apiUser = "http://localhost:8000/api/users";
    apiPost = "http://localhost:8000/api/posts";

    /////////// FOR CHANGING SCREEN
    changeScreen = (url) => {
        window.location.href = (url)
    }

    post_main = event => {
        console.log(event.path);
        this.changeScreen('/post_main/' + event.path[2].title);
        Cookies.set('title_post', event.path[2].title);
        Cookies.set('id_post', event.path[2].id);
    }
    //////////////////////////
    state = {
        user: [],
        imagefile: [],
    }

    like_create = event => {
        event.preventDefault();
        let token = Cookies.get('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        console.log(event.path);
        axios.post(this.apiPost + '/' + event.path[2].id + '/like', { "type": "like" })
            .then((res) => {
                console.log(res);
                window.location.reload();
            })

    }
    //////////////////////////
    Logout = event => {
        event.preventDefault();

        let token = Cookies.get('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        axios.post(this.apiUrl)
            .then((res) => {
                console.log(res);
                Cookies.remove('token');
                Cookies.remove('login');
                this.props.history.push('/login');
            })
    }
    ///////////////////////////////
    componentDidMount() {
        let token = Cookies.get('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        let login = Cookies.get("login");
        axios.get(this.apiUser + "/" + login)
            .then(res => {
                const user = res.data;
                this.setState({ user });
                console.log(res);
                console.log(res.data);
            })

        axios.get(this.apiUser + "/" + login + "/avatar", { responseType: "blob" })
            .then(resp => {
                const imagefile = URL.createObjectURL(resp.data);
                document.getElementById("preview").src = imagefile;
                this.setState({ imagefile });
            });

        axios.get(this.apiPost)
            .then(res => {
                console.log(res.data);
                let post_data = res.data;
                for (let i = 0; i < post_data.length; i++) {
                    let main = document.createElement('div');
                    main.className = "shadow-sm p-3 mb-5 bg-white rounded card m-2 card-body d-flex flex-column";
                    main.setAttribute('title', post_data[i].title);
                    main.setAttribute('id', post_data[i].id);
                    let info = document.createElement('div');
                    let footer = document.createElement('div');
                    info.className = "card-body";
                    footer.className = "card-footer";

                    let media = document.createElement('div');
                    media.className = "media mb-3";
                    let media2 = document.createElement('div');
                    media2.className = "media-body ml-3";

                    let auth = document.createElement('div');
                    auth.className = "text-muted big";
                    let cat = document.createElement('div');
                    cat.className = "text-muted small";
                    let cont = document.createElement('p'); console.log(this.apiPost + "/" + post_data[i].id + "/categories");
                    axios.get(this.apiPost + "/" + post_data[i].title + "/categories")
                        .then(res => {
                            console.log(res.data);
                            for (let i = 0; i == i; i++) {
                                if (res.data[0][i] !== undefined) {
                                    cat.innerHTML = res.data[0][i].title;
                                    break;
                                }
                            }
                        })
                    let like = document.createElement('button');
                    like.className = "btn btn-link d-inline-block text-muted ml-3 p-2";
                    let comment = document.createElement('button');
                    comment.className = "btn btn-link d-inline-block text-muted ml-3";
                    let st1 = document.createElement('strong');
                    let st2 = document.createElement('strong');
                    axios.get(this.apiPost + "/" + post_data[i].id + "/like")
                        .then(res => {
                            console.log(res.data);
                            st1.innerHTML = res.data.length;

                        })

                    auth.innerHTML = post_data[i].author;
                    cont.innerHTML = post_data[i].content;
                    media2.innerHTML = post_data[i].title;
                    like.innerHTML = "Likes ";
                    comment.innerHTML = "See comments";

                    like.appendChild(st1);
                    comment.appendChild(st2);
                    info.appendChild(media);
                    info.appendChild(cont);
                    media.appendChild(media2);
                    media2.appendChild(auth);
                    media2.appendChild(cat);
                    footer.appendChild(like);
                    footer.appendChild(comment);
                    main.appendChild(info);
                    main.appendChild(footer);

                    comment.onclick = this.post_main;
                    like.onclick = this.like_create;
                    document.getElementById('post_side').appendChild(main);

                }
            })

    }
    ///////////////////////////////
    LoadImg = event => {
        event.preventDefault();
        let formdata = new FormData();
        let login = Cookies.get('login');
        let token = Cookies.get('token');
        formdata.append('prof_pic', document.querySelector('#image').files[0]);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.post(this.apiUser + "/avatar", formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': "application/json"
            }
        })
            .then((res) => {
                window.location.reload();
                console.log(res);
            })

    }


    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }


    render() {
        return (
            <div class="d-flex flex-row">
                <div class="left">
                    <div class="shadow p-3 mb-5 bg-white rounded card m-5 d-flex flex-row card-body d-flex flex-column align-items-center text-center" style={{ "width": 320 + "px" }}>
                        <p class="form-group mx-sm-3 mb-2" style={{ "font-size": 25 + "px" }}>Hello, {Cookies.get('login')}</p>
                        <br></br>
                        <ul style={{ "list-style": "none" }}>
                            <img id="preview" class="" src="" style={{ "borderRadius": 10 + "%", "width": 200 + "px", height: "200px" }} />
                            {this.state.user.map(person => <li>Full name:{person.full_name}</li>)}
                            {this.state.user.map(person => <li>E-mail: {person.email}</li>)}

                        </ul>
                        <br></br>
                        <div class="mx-auto" >
                            <form class="form-inline" onSubmit={this.LoadImg}>
                                <div class="form-group mx-sm-3 mb-2">
                                    <input id='image' type="file" name="imagefile" onChange={this.onChange} class="form-control" />
                                    <input type="submit" class="btn btn-primary" value='Change Avatar' />
                                </div>
                            </form>
                            <form class="form-group mx-sm-3 mb-2" onSubmit={this.Logout}>
                                <button class="btn btn-outline-primary" type="submit">Logout</button>
                            </form>
                        </div>
                    </div>
                    <Router>
                        <div class="shadow p-3 mb-5 bg-white rounded card m-5 card-body d-flex flex-column align-items-center text-center">
                            <Link to='/create_post'><button class="btn btn-primary mb-3" style={{ "width": 160 + "px", "height": 40 + "px" }}>Create post</button></Link>
                            <Link to='/create_cat'><button class="btn btn-primary" style={{ "width": 160 + "px", "height": 40 + "px" }}>Create category</button></Link>
                        </div>
                        <Switch>
                            <Route path='/create_post' component={createPost} />
                            <Route path='/create_cat' component={createCat} />
                        </Switch>
                    </Router>
                </div>

                <div id="post_side" class="d-flex flex-row" style={{ flexWrap: "wrap" }}>
                </div>
            </div >


        );
    }
}

