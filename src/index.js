import {render}  from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route } from "react-router-dom";
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import Alert from 'react-bootstrap/Alert'
import Navigation from './components/navigation/Navigation';
import Footer from './components/footer/Footer';
import {HomePage} from './components/homePage/HomePage';



render(
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="" element={<HomePage />} >
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <Alert variant="danger" style = {{textAlign: "center"}}> 
                Tu nic nie ma!
              </Alert>
            </main>
          }
        />
      </Route>
    </Routes>
    <Footer />
  </BrowserRouter>,
  document.getElementById('root')
);