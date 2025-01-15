import { create } from "zustand";

const useNoteStore = create((set) => ({
  // kurssit:
    courseList: [],
    fetchCourses: async () => {
      try {
        const response = await fetch('https://luentomuistiinpano-api.netlify.app/.netlify/functions/courses');
        const data = await response.json();
        set({courseList: data });
        console.log("Fetching courses completed")
      } catch (error) {
        console.error("Error fetching courses")
      }
    },
    addCourse: (CourseObject) => 
      set((state) => ({ courseList: [...state.courseList, { name: CourseObject.name, id: CourseObject.id }] }), 
    ),

    createNotesViewDisabled: false,
    checkIfCoursesListIsEmpty: (courseList) => set((state) => {
      if (courseList.length == 0) {
        return {createNotesViewDisabled: true}
      } else {
      return {createNotesViewDisabled: false}};
    }),

    // muistiinpanot:
    noteList: [],
    recentNotes: [],
    filteredNotes: [],
    fetchNotes: async () => {
      try {
        const response = await fetch('https://luentomuistiinpano-api.netlify.app/.netlify/functions/notes')
        const data = await response.json();
        set({noteList: data});
      } catch (error) {
        console.error("error fetching notes")
      }
    },
    addNote: (NoteObject) =>
      set((state) => ({ 
        noteList: [...state.noteList, NoteObject
        ],
      })),
    addRecentNote: (NoteObject) => 
      set((state) => ({
        recentNotes: [
          ...state.recentNotes, {
            text: NoteObject.text, 
            timestamp: NoteObject }],
    })),
    deleteNote: (noteToDelete) => {
      set((state) => {
          const updatedNoteList = state.noteList.filter((n) => n.id !== noteToDelete.id);
          const updatedFilteredNotes = state.filteredNotes.filter((n) => n.id !== noteToDelete.id);

          if (!state.filteredNotes.length) {
            return { noteList: updatedNoteList, filteredNotes: updatedNoteList };
          }

       if (updatedFilteredNotes.length === 0) {
        return { noteList: updatedNoteList, filteredNotes: [] };
        }

        return {
            noteList: updatedNoteList,
            filteredNotes: updatedFilteredNotes,
          };
      });
  },
  filterNotes: (courseID) => {
    set((state) => {
        if (!courseID) {
            return { filteredNotes: state.noteList };
        }
        
        const filtered = state.noteList.filter((note) => note.course.id.toString() === courseID.toString());

        if (filtered.length === 0) {
            return { filteredNotes: [] };
        }
        
        return { filteredNotes: filtered };
    });
},


  }
));

export default useNoteStore;

