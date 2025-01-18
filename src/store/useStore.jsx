import { create } from "zustand";

const useStore = create((set) => ({
  // kurssit:
  courseList: [],
  fetchCourses: async () => {
    try {
      const response = await fetch(
        "https://luentomuistiinpano-api.netlify.app/.netlify/functions/courses"
      );
      const data = await response.json();
      set({ courseList: data });
      console.log("Fetching courses completed");
    } catch (error) {
      console.error("Error fetching courses");
    }
  },
  addCourse: (CourseObject) =>
    set((state) => ({
      courseList: [...state.courseList, { name: CourseObject.name, id: CourseObject.id }],
    })),

  createNotesViewDisabled: false,
  checkIfCoursesListIsEmpty: (courseList) =>
    set((state) => ({
      createNotesViewDisabled: courseList.length === 0 ? true : false,
    })),

  // muistiinpanot:
  noteList: [],
  filteredNotes: [],
  recentNotes: [],
  fetchNotes: async () => {
    try {
      const response = await fetch(
        "https://luentomuistiinpano-api.netlify.app/.netlify/functions/notes"
      );
      const data = await response.json();
      set((state) => ({
        noteList: data,
        filteredNotes: state.filteredNotes.length ? state.filteredNotes : data,
      }));
    } catch (error) {
      console.error("Error fetching notes");
    }
  },

  addNote: (NoteObject) =>
    set((state) => {
      const updatedNotes = [...state.noteList, NoteObject];
      return {
        noteList: updatedNotes,
        filteredNotes: updatedNotes,
      };
    }),

  addRecentNote: (NoteObject) => 
  set((state) => ({recentNotes: [...state.recentNotes, {text: NoteObject.text, timestamp: NoteObject }],
})),

clearRecentNotes: () => set({ recentNotes: [] }),

  filterNotes: (courseID) => {
    set((state) => {
      if (!courseID) {
        return { filteredNotes: state.noteList };
      }
      const filtered = state.noteList.filter(
        (note) => note.course.id.toString() === courseID.toString()
      );
      return { filteredNotes: filtered };
    });
  },

  deleteNote: (noteToDelete) => {
    set((state) => {
      const updatedNotes = state.noteList.filter((n) => n.id !== noteToDelete.id);
      const updatedFilteredNotes = state.filteredNotes.filter((n) => n.id !== noteToDelete.id);

      return {
        noteList: updatedNotes,
        filteredNotes: updatedFilteredNotes,
      };
    });
  },
}));

export default useStore;




