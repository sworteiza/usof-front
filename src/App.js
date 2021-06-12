import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Register from "./Register";
import ProfilePage from "./ProfilePage";
import Login from "./Login";
import Post_main from "./post_main";
import Gif from "./gifka";


export default function App() {
    return (
        <Router>
            <div class="container">
                <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <a href="" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">

                    </a>

                    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/" class="nav-link px-2 link-secondary">Home</Link></li>
                        <li><a href="#" class="nav-link px-2 link-dark">About</a></li>
                    </ul>

                    <div class="col-md-3 text-end">
                        <Link to={'/login'} ><button type="button" class="btn btn-outline-primary me-2">Login</button></Link>
                        <Link to={'/register'}><input type="button" class="btn btn-primary" value='Sign up' /></Link>
                    </div>

                </header>
            </div>
            <Switch>
                <Route path='/register' component={Register} />
                <Route path='/main' component={ProfilePage} />
                <Route path='/post_main' component={Post_main} />
                <Route path='/login' component={Login} />
                <Route path='/' component={Gif} />
            </Switch>

        </Router>

    );
}
