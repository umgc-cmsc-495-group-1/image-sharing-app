import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import ExampleHome from "./components/examples/ExampleHome";
import ExampleAbout from "./components/examples/ExampleAbout";
import ExampleUserLink from "./components/examples/ExampleUserLink";
import Example404 from "./components/examples/Example404";
import ExampleUserPage from "./components/examples/ExampleUserPage";
// import './css/App.css';

// This is just and example to show how components can work together

function App() {
  return (
      <div>
          <Router>
              <nav>
                  <Link to="/">Home</Link>
                  <br/>
                  <Link to="/about">About</Link>
                  <br/>
                  <Link to="/users">Users</Link>
              </nav>

              <Routes>
                  <Route path="/" element={<ExampleHome />} />
                  <Route path="/about" element={<ExampleAbout />} />
                  <Route path="/users/:name" element={<ExampleUserPage />} />
                  <Route path="/users" element={<ExampleUserLink />} />
                  <Route path="*" element={<Example404 />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;
