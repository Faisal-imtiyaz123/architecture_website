
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Home from "./routes/Home";
import Architecture from "./routes/Architecture";
import Interiors from "./routes/Interiors";
import Sectors from "./routes/Sectors";
import About from "./routes/About";
import Careers from "./routes/Careers";
import Publication from "./routes/Publication";
import Index from "./routes/Index";
import  { Toaster } from 'react-hot-toast';
import {
 
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'
export default function App() {
  const queryclient = new QueryClient();
  return (
  <QueryClientProvider client={queryclient}>
    <Toaster/>
    <Router>
      <Routes>
        <Route path="/" element={<Index/>}>
        <Route index element={<Home />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/interiors" element={<Interiors />} />
        <Route path="/sectors" element={<Sectors />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/publication" element={<Publication />} />
        </Route>
      </Routes>
    </Router>
  </QueryClientProvider>
  )
}