import { useState } from "react"
import useStore from "./store/useStore"
import { TextInput, Button, Title, Input } from '@mantine/core';

export default function CourseCreator() {

    const [newCourse, setNewCourse] = useState("");
    const [courseID, setID] = useState("");
    const addCourse = useStore((state) => state.addCourse);

    const [text, setText] = useState();
    
    const CourseObject = {
        id: courseID,
        name: newCourse
    }
    const handleSave = () => {
        if (newCourse.trim().length > 0 && courseID.trim().length > 0) {

        addCourse(CourseObject);
        setNewCourse("");
        setID("");
        setText("opintojakso " + newCourse + " lisätty id:llä " + courseID)
        }
    }

    return (
        <div>
            <Title order={2} pt="xl" pb="md">Add a new course</Title>
          
            <TextInput  
                type="text" 
                radius="md"
                size="lg"
                label="Course name:"
                placeholder="course"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                pt="xs"
                />
       
            <Input  
                radius="md"
                size="lg"
                type="number"
                label="ID number:"
                placeholder="id"
                value={courseID}
                onChange={(e) => setID(e.target.value)}
                pt="xs"
                pb="lg"
                />
    
            <Button 
                variant="filled" 
                size="md" 
                radius="md" 
                onClick={handleSave} 
                color="cyan">
                    Save
            </Button>

            <p>{text}</p>
        </div>
    )
}