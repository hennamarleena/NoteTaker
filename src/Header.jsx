import { Link } from "react-router-dom";
import useStore from "./store/useStore";
import { useEffect } from "react";
import { Button, Flex, Title } from "@mantine/core";

export default function Header() {

  const courseList = useStore((state) => state.courseList);
  const checkIfCoursesListIsEmpty = useStore((state) => state.checkIfCoursesListIsEmpty)
  const createNotesViewDisabled = useStore((state) => state.createNotesViewDisabled)

  useEffect(() => {
    checkIfCoursesListIsEmpty(courseList);
  }, [courseList, checkIfCoursesListIsEmpty]);
  
    return (
    <header>
       <Title order={1} pb="lg">
          NoteTaker
        </Title>
        <Flex gap="xs" wrap="wrap">
          <Button component={Link} to="/home" radius="md" color="cyan" size="md" >
              Home
          </Button>
    
          <Button component={Link} to="/createnotes" style={ {pointerEvents: createNotesViewDisabled ? "none" : "auto"}} radius="md" color="cyan" size="md">
            Create notes
          </Button>

          <Button component={Link} to="/listnotes" radius="md" color="cyan" size="md">
            List notes
          </Button>

          <Button component={Link} to="/addcourses" radius="md" color="cyan" size="md">
            Add courses
          </Button>
      </Flex>
    </header>
    )
}