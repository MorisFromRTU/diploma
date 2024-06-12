import DefaultPage from "../pages/DefaultPage";
import ErrorPage from "../pages/ErrorPage";
import MainPage from "../pages/MainPage";
import AboutPage from "../pages/AboutPage";
import ForumPage from "../pages/ForumPage";
import QuestionPage from "../pages/QuestionPage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import QuestionItem from "../components/QuestionItem";
import QuestionItemPage from "../pages/QuestionItemPage";
import PersonalPage from "../pages/PersonalPage";
import CoursesPage from "../pages/CoursesPage";
import WebCoursesPage from "../pages/WebCoursesPage";
import PythonStartPageOne from "../pages/WebPages/PythonStartPages/PythonStartPageOne";
import PythonStartPageOneOneTwo from "../pages/WebPages/PythonStartPages/PythonStartPageOneOneTwo";
import CommunitiesPage from "../pages/CommunitiesPage";
import CommunityPage from "../pages/CommunityPage";
import PersonalChange from "../pages/PersonalChange";
import PythonStartPageOneOne from "../pages/WebPages/PythonStartPages/PythonStartPageOneOne";


export const privateRoutes = [
    { path: '/', element: <MainPage/>, exact: true},
    { path: '/about', element: <AboutPage/>, exact: true},
    { path: '/forum', element: <ForumPage/>, exact: true},
    { path: '/courses', element: <CoursesPage/>, exact: true },
    { path: '/webcourses', element: <WebCoursesPage/>, exact: true },
    { path: '/question', element: <QuestionPage/>, exact: true   },
    { path: '/forum/:id', element: <QuestionItemPage />, exact: true },
    { path: '/user/:username', element: <PersonalPage/>, exact: true },
    { path: '/user/:username/change', element: <PersonalChange/>, exact: true },
    { path: '/pythonstart/unit=1', element: <PythonStartPageOne/>, exact: true },
    { path: '/pythonstart/unit=1/1', element: <PythonStartPageOneOne/>, exact: true },
    { path: '/pythonstart/unit=1/2', element: <PythonStartPageOneOneTwo/>, exact: true },
    { path: '/communities', element: <CommunitiesPage/>, exact: true },
    { path: '/community', element: <CommunityPage/>, exact: true },
    
]

export const publicRoutes = [
    { path: '/forum', element: <ForumPage/>, exact: true },
    { path: '/registration', element: <RegistrationPage/>, exact: true },
    { path: '/', element: <MainPage/>, exact: true },
    { path: '/login', element: <LoginPage/>, exact: true },
    { path: '/courses', element: <CoursesPage/>, exact: true },
    { path: '/webcourses', element: <WebCoursesPage/>, exact: true },
    { path: '/forum/:id', element: <QuestionItemPage />, exact: true },
];
