import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
} from "react-router-dom";
import { LoginPage } from "./../pages/Login";
import { HomePage } from "./../pages/Home";
import { ExamPage } from "./../pages/ExamPage";
import { SettingsPage } from "./../pages/Settings";
import { ProtectedLayout } from "./../components/ProtectedLayout";
import { HomeLayout } from "./../components/HomeLayout";
import "./index.css";
import { AuthLayout } from "./../components/AuthLayout";
import ExamDashboard from "../pages/ExamDashboard";

// ideally this would be an API call to server to get logged in user data

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("user");
      resolve(user);
    }, 3000)
  );

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route exact path="exams" element={<ExamDashboard />} />
        <Route exact path="exams/:id" element={<ExamPage />} />
        <Route
          exact
          path="exams/:id/:questionNumberId"
          element={<ExamPage />}
        />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Route>
  )
);

// import "./App.css";
// import ExamPage from "../features/exams/ExamPage";
// import { Container } from "semantic-ui-react";
// import NavBar from "./NavBar";
// import { ToastContainer } from "react-toastify";
// import { Route, Routes } from "react-router-dom";
// import ExamDashboard from "../features/exams/ExamDashboard";
// import { ExamContext } from "../context";
// import { useState, useEffect } from "react";
// import { ProtectedRoute } from "../components/ProtectedRoute.jxs";
// import HomePage from "./../features/home/HomePage";

// function App() {
//   const getUserData = () =>
//     new Promise((resolve) =>
//       setTimeout(() => {
//         const user = window.localStorage.getItem("user");
//         resolve(user);
//       }, 3000)
//     );

//   const [total, setTotal] = useState(0);
//   const [totalMax, setTotalMax] = useState(0);
//   const [started, setStarted] = useState(0);
//   const [questionNumber, setQuestionNumber] = useState(0);
//   const [correctAwnsers, setCorrectAwnsers] = useState(0);
//   const [incorrectAwnsers, setIncorrectAwnsers] = useState(0);
//   const [passMark, setPassMark] = useState(800);
//   return (
//     <>
//       <ToastContainer position="bottom-right" hideProgressBar />
//       {/* <ModalContainer /> */}

//       <NavBar />
//       <Container style={{ marginTop: "7em" }}>
//         <ExamContext.Provider
//           value={{
//             total,
//             setTotal,
//             questionNumber,
//             setQuestionNumber,
//             started,
//             setStarted,
//             correctAwnsers,
//             setCorrectAwnsers,
//             incorrectAwnsers,
//             setIncorrectAwnsers,
//             passMark,
//             setPassMark,
//             totalMax,
//             setTotalMax,
//           }}
//         >
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             {/* <Route path="/login" element={<LoginPage />} /> */}
//             <Route
//               path="/exams"
//               element={
//                 <ProtectedRoute>
//                   <ExamDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/exams/:id"
//               element={
//                 <ProtectedRoute>
//                   <ExamPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               exact
//               path="/exams/:id/:questionNumberId"
//               element={
//                 <ProtectedRoute>
//                   <ExamPage />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </ExamContext.Provider>
//       </Container>
//     </>
//   );
// }

// export default App;
