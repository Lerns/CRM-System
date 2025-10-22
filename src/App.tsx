import "./App.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <>
      <RouterProvid router={router} />
    </>
  );
}
export default App;
