import useStore from "./store/useStore"
import NoteItem from "./NoteItem"
import SelectCourseMenu from "./SelectCourseMenu";
import { Title } from "@mantine/core";

export default function NoteList() {

    const noteList = useStore((state) => state.noteList);
    const filteredNotes = useStore((state) => state.filteredNotes)

    const notesToDisplay = filteredNotes.length > 0 ? filteredNotes : noteList;

    
    return (
        <>
            <Title order={2} mt="xl">List notes</Title>

            <SelectCourseMenu enableFiltering={true}/>

            {notesToDisplay.length > 0 ? (
                notesToDisplay.map((note, i) => (
                    <NoteItem key={note.id || i} note={note}/>
                ))
            ) : (
                <p>No notes!</p>
            )}
        </>
    )
}