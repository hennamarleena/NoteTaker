import useStore from "./store/useStore";
import { Card, Button, Flex, Text, Box, Title } from "@mantine/core";

export default function NoteItem( {note} ) {
    
    const deleteNote = useStore((state) => state.deleteNote);
    const clickHandler = () => {
        deleteNote(note)
    }
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    }
    
    return(
        <Card 
            shadow="sm" 
            padding="lg" 
            radius="md" 
            withBorder 
            mt="15px"
            pb="30px"
            pt="30px"
            >
            <Flex justify="space-between" align="center" wrap="wrap">
            <Box>
                <Title fw={500} size="lg" mb="10px">
                    {formatDate(note.timestamp) }{' '}
                    {note.course.name || "Unknown Course"}{' '}
                    (id: {note.course.id})
                </Title>
                <Text>{note.text || "No content available."}</Text>
            </Box>
            <Button variant="filled" color="#ff6b6b" size="xs" onClick={clickHandler}>
                Delete
            </Button>
            </Flex>
        </Card>   
    )
}