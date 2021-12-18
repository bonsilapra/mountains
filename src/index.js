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
import {About} from './components/about/About';
import {Attractions} from './components/attractions/Attractions';



render(
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="" element={<HomePage />} />
      {/* <Route path="kgpLista" element={<KGPList />} />
      <Route path="trips" element={<Trips />} />
      <Route path="trip:id" element={<Trip />} />
      <Route path="mountainRanges" element={<MountainRanges />} />
      <Route path="mountainRange:id" element={<MountainRange />} />
      <Route path="regions" element={<Regions />} />
      <Route path="region:id" element={<Region />} />*/}
      <Route path="attractions" element={<Attractions />} /> 
      <Route path="about" element={<About />} />
      <Route
        path="*"
        element={
          <main style={{ paddingTop: "15rem", paddingBottom: "10rem" }}>
            <Alert variant="danger" style = {{textAlign: "center"}}> 
              Tu nic nie ma!
            </Alert>
          </main>
        }
      />
    </Routes>
    <Footer />
  </BrowserRouter>,
  document.getElementById('root')
);