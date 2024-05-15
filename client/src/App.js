import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import TeacherSignUp from './pages/TeacherSignUp';
import TeacherSignIn from './pages/TeacherSignIn';
import TeacherHome from './pages/TeacherHome';
import StudentSignIn from './pages/StudentSignIn';
import StudentSignUp from './pages/StudentSignUp';
import StudentHome from './pages/StudentHome';
import AddQuestions from './pages/AddQuestions';
import BrowseQuiz from './pages/BrowseQuiz';
import CreateQuiz from './pages/CreateQuiz';
import StartQuiz from "./pages/StartQuiz";
import Quiz from "./pages/Quiz";
import JoinQuiz from "./pages/JoinQuizViaCode";
import DeleteQuiz from "./pages/DeleteQuiz";
const router=createBrowserRouter([
  {path:'',element:<Home/>},
  {path:'TeacherHome',element:<TeacherHome/>},
  {path:'TeacherSignUp',element:<TeacherSignUp/>},
  {path:'TeacherSignIn',element:<TeacherSignIn/>},
  {path:'StudentSignIn',element:<StudentSignIn/>},
  {path:'StudentSignUp',element:<StudentSignUp/>},
  {path:'StudentHome',element:<StudentHome/>},
  {path:'/start-quiz', element:<Quiz/>},
  {path:'/add-question', element:<AddQuestions/>},
  {path:'/browse-quiz', element:<BrowseQuiz/>},
  {path:'/create-quiz', element:<CreateQuiz/>},
  {path:'/start-quiz/:quizId', element:<StartQuiz/>},
  {path:'/join-quiz', element:<JoinQuiz/>},
  {path:'/delete-quiz', element:<DeleteQuiz/>},
  {path:'cour'}
])
function App() {
  return <RouterProvider router={router}/>;
}

export default App;
