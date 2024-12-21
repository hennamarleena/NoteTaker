import CreateNotesView from './views/CreateNotesView';
import ListNotesView from './views/ListNotesView';
import AddCoursesView from './views/AddCoursesView';
import HomeView from './views/HomeView';
import Header from './Header';
import { Routes, Route, Outlet } from "react-router-dom";
import useStore from './store/useStore';
import './index.css'
import '@mantine/core/styles.css';
import { Container } from '@mantine/core';

function App() {
  
  const fetchCourses = useStore((state) => state.fetchCourses);
  const fetchNotes = useStore((state) => state.fetchNotes);

  fetchNotes();
  fetchCourses();

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeView />} />
        <Route path="home" element={<HomeView />} />
        <Route path="createnotes" element={<CreateNotesView />} />
        <Route path="listnotes" element={<ListNotesView />} />
        <Route path="addcourses" element={<AddCoursesView />} />
      </Route>
    </Routes>
    </>
  );

}

function Layout() {
  return (
    <Container
      pb="xl" 
      pt="xl"
      p="xl"
      bg="#FFF" 
      style={{ 
        borderRadius: '10px', 
        boxShadow: "0px 5px 10px 0px rgba(167, 167, 167, 0.35)" }}
      >
      <Header/>
      <Outlet />
    </Container>
  );
}

export default App;
