import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Post from "./post";
import PageNotFound from "./notFound";

export function RouterLayer() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
