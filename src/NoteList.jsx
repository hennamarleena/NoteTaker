import useStore from "./store/useStore"
import NoteItem from "./NoteItem"
import SelectCourseMenu from "./SelectCourseMenu";
import { Title } from "@mantine/core";

export default function NoteList() {

    const noteList = useStore((state) => state.noteList);
    const filteredNotes = useStore((state) => state.filteredNotes)
    const key = filteredNotes.length === 0 ? noteList : filteredNotes;
    
    return (
        <>
            <Title order={2} mt="xl">List notes</Title>

            <SelectCourseMenu enableFiltering={true}/>

            {key.map( (note, i) => (
                <NoteItem key={i} note={note}/>
            ))}

            {key.length == 0 && <p>No notes!</p>}
            </>
    )
}