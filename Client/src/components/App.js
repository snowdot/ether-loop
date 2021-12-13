import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AuthProvider from "../context/AuthContext";
import DataProvider from "../context/DataContext";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import SocialPage from "./pages/SocialPage";
import NftPage from "./pages/NftPage";
import PoapPage from "./pages/PoapPage";
import LedgerPage from "./pages/LedgerPage";

function App() {
  return (
      <AuthProvider>
            <DataProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/social" element={<SocialPage />} />
                        <Route path="/nfts" element={<NftPage />} />
                        <Route path="/poaps" element={<PoapPage />} />
                        <Route path="/ledger" element={<LedgerPage />} />
                    </Routes>
                </BrowserRouter>
            </DataProvider>
        </AuthProvider>
    );
}

export default App;
