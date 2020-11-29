import React from "react";
// Routes
import { Route } from "react-router-dom";
// Components and Pages
import Home from "./pages/Home";
import Nav from "./components/Nav";
// Styles
import GlobalStyles from "./components/GlobalStyle";


function App() {
  return (
    <div className="App">
      <GlobalStyles />
        <Nav />
        <Route path={["/game/:id", "/"]}>     
          <Home />
      </Route>
    </div>
  );
}

export default App;