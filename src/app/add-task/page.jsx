const { default: AddTask } = require("./AddTask")

export const metadata = {
    title: "Add Task: Work Manager"
}

const AddTaskPage=()=>{
    return(
        <>
            <AddTask />
        </>
    )
}

export default AddTaskPage;