import {Routes , Route} from 'react-router-dom';

import Home from "./pages/Home";
import UploadResume from "./pages/UploadResume";
import Dashboard from "./pages/Dashboard";
import LoadingPage from "./pages/LoadingPage";
import ReportPage from "./pages/ReportPage";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<UploadResume />} />
        <Route path='/loading' element={<LoadingPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/report' element={<ReportPage />} />
        <Route path='/analytics' element={<AnalyticsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default App