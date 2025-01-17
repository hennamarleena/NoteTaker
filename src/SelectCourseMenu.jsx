import useStore from "./store/useStore";
import { NativeSelect } from "@mantine/core";

export default function SelectCourseMenu({ onSelect, isDisabled, enableFiltering, changeOptionLabel }) {
    const courseList = useStore((state) => state.courseList);
    const filterNotes = useStore((state) => state.filterNotes);

    const handleChange = (e) => {
        const selectedCourseId = e.target.value;
        console.log(e.target.value)
        const selectedCourse = courseList.find(course => course.id.toString() === selectedCourseId);

        if (onSelect) {
            onSelect(selectedCourse || null);
        }

        if (enableFiltering) {
            filterNotes(selectedCourseId);
        }
    };
  
    return (
        <div>
            <NativeSelect
                radius="md"
                size="lg"
                data={[
                    { value: "", label: changeOptionLabel || "All" },
                    ...courseList.map(course => ({ value: course.id.toString(), label: course.name })),
                ]}
                onChange={handleChange}
                disabled={isDisabled}
                mt="md"
            />
        </div>
    );
}
