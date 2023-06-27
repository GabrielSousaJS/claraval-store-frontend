import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { BrowserRouter } from "react-router-dom";

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Navbar />
            <Footer />
        </BrowserRouter>
    );
}