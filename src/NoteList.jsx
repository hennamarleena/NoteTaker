import useStore from "./store/useStore";
import NoteItem from "./NoteItem";
import SelectCourseMenu from "./SelectCourseMenu";
import { Title } from "@mantine/core";

export default function NoteList() {
    const filteredNotes = useStore((state) => state.filteredNotes);
    
    return (
        <>
            <Title order={2} mt="xl">List notes</Title>

            <SelectCourseMenu enableFiltering={true}/>

            {filteredNotes.length > 0 ? (
                filteredNotes.map((note, i) => (
                    <NoteItem key={note.id || i} note={note} />
                ))
            ) : (
                <p>No notes!</p>
            )}
        </>
    );
}