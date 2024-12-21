import { useState } from 'react';
import useStore from './store/useStore';
import SelectCourseMenu from './SelectCourseMenu';
import { Textarea, Button, Title, Box } from '@mantine/core';

export default function NoteCreator() {

    const [noteText, setNoteText] = useState("");
    const [selectedCourse, setSelectedCourse] = useState({ id:"", name:"" });
    const [disablingCourseMenu, setDisablingCourseMenu] = useState(false);
    const disablingOption = useState(true);
    const noteList = useStore((state) => state.noteList);
    const addNote = useStore((state) => state.addNote);
    const addRecentNote = useStore((state) => state.addRecentNote)

    const handleSave = () => {
        if (!noteText.trim()) return;

        const lastNote = noteList[noteList.length - 1]

        const NoteObject = {
            id: lastNote.id + 1,
            text: noteText,
            course: {
                id: selectedCourse.id, 
                name: selectedCourse.name 
            },
            timestamp: new Date(),
        }
        addNote(NoteObject);
        addRecentNote(NoteObject);
        setNoteText("");
        setDisablingCourseMenu(true);
     }
 
    return (
        <Box >  
            <Title order={2} pt="xl">Create notes</Title>

            <p>Add new notes for class</p>
            
            <SelectCourseMenu onSelect={setSelectedCourse} isDisabled={disablingCourseMenu} isOptionDisabled={disablingOption} />
        
            <Textarea
                size="lg"
                radius="md"
                label="Write a note:"
                type="text" 
                value={noteText}
                placeholder='1 + 1 = 2' 
                onChange={(e) => setNoteText(e.target.value)}
                pt="xs"
                pb="lg"
                autosize
                minRows={5} 
            />

        <Button variant="filled" size="md" radius="md" onClick={handleSave} color="cyan">Save</Button>
    
        </Box>
    )
}


