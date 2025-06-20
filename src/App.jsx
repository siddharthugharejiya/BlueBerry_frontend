import './App.css';
import MainRouter from './Router/MainRouter';
// In your index.js or App.js
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,       // animation time (ms)
      easing: "ease-in-out", // smooth easing
      // once: true,            // animate only once
      // delay: 200,            // delay start (optional)
      // mirror: false          // don't animate on scroll-up
    });
  }, []);
  return (
    <>

      <div className="container m-auto overflow-hidden">
        <ToastContainer position="top-right" autoClose={3000} />
        <MainRouter />
      </div>
    </>
  );
}

export default App;
