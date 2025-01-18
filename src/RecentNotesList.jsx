import useStore from "./store/useStore";
import { Card } from "@mantine/core";
import { useEffect } from "react";

export default function RecentNotesList() {

const recentNotes = useStore((state) => state.recentNotes);
const clearRecentNotes = useStore((state) => state.clearRecentNotes);


useEffect(() => {
    return () => {
      clearRecentNotes();
    };
  }, [clearRecentNotes]);
 
    return (
        <>
            {recentNotes.map( (note, i) => (
                <Card 
                    key={i} 
                    shadow="sm" 
                    padding="lg" 
                    radius="md" 
                    withBorder 
                    mt="15px"
                    pb="30px"
                    pt="30px"> 
                    {note.text} 
                </Card>
            ))}
        </>
    )
}