import Form from "./Form";
import Main from "./Main";
import Error from "./Error";
import "./App.css";
import { AppProvider } from "./context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="form" element={<Form />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
