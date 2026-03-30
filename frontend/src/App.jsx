import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <>
      <Toaster richColors />

      <BrowserRouter>
        <Routes>
          <Route
            path="/" //trang chủ
            element={<HomePage />}
          />
          <Route
            path="*" //bất kì đường dẫn nào ko gớp dẫn dô đây
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
