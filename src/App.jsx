import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import CreatePoll from "./pages/CreatePoll.jsx";
import PollList from "./pages/PollList.jsx";
import PollPage from "./pages/PollPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PollList />} />
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/poll/:id" element={<PollPage />} />
        <Route path="/results/:id" element={<ResultsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
