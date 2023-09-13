import React, { useState, useEffect } from "react";

const TaskManager = () => {
    const [taskInputValue, setTaskInputValue] = useState("");
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("taskItems")) || []);
    const [EditTextIndices, setEditTextIndices] = useState([]);
    const [deletedIndices, setDeletedIndices] = useState([]);


    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("taskItems"));
        if (localStorageData && localStorageData.length > 0) {
            setTasks(localStorageData);
        }
    }, []);

    const handleTaskInputChange = (event) => {
        setTaskInputValue(event.target.value);
    };

    const handleAddTask = () => {
        if (taskInputValue === "") {
            alert("Please Enter Task");
        }
        else {
            const tasktext = taskInputValue.trim();
            const date = new Date();
            const year = date.getFullYear();
            const month = date.toLocaleString("default", { month: "long" });
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const taskAdddate = `${month} ${day},${year} ${hours}:${minutes}:${seconds}`;
            const newTask = {
                tasktext,
                taskAdddate,
                done: false,
            };
            setTasks([...tasks, newTask]);
            localStorage.setItem("taskItems", JSON.stringify([...tasks, newTask]));
            setTaskInputValue("");
        }
    };

    const handleCheckBox = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].done = !updatedTasks[index].done;
        setTasks(updatedTasks);
        localStorage.setItem("taskItems", JSON.stringify(updatedTasks));
    };

    const handleEditTask = (index) => {
        const taskToEdit = tasks[index];
        setTaskInputValue(taskToEdit.tasktext);
        handleDeleteTask(index);
        setEditTextIndices([index]);
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem("taskItems", JSON.stringify(updatedTasks));
        setDeletedIndices([]);
    };

    return (
        <div className="container">
            <h1>To-Do List</h1>
            <div className="Addtasks">
                <input
                    id="taskInput"
                    type="text"
                    value={taskInputValue}
                    onChange={handleTaskInputChange}
                    placeholder="Enter Task"
                />
                <button className="taskAdd" onClick={handleAddTask}>Add Task</button>
            </div>
            <ul id="taskList">
                {tasks.map((task, index) => (
                    <li key={index}>
                        <div className="ListHead">
                            <input
                                type="checkbox"
                                name="checkbox"
                                className="CheckBox"
                                checked={task.done}
                                onChange={() => handleCheckBox(index)}
                            />
                            <p className="text">{task.tasktext}</p>
                            <i
                                className="fa-solid fa-pen-to-square edit-button"
                                style={{ color: "#074fca" }}
                                onClick={() => handleEditTask(index)}
                            ></i>
                            <i
                                className="fa-solid fa-trash delete-button"
                                onClick={() => handleDeleteTask(index)}
                            ></i>
                        </div>
                        <div className="Date">{task.taskAdddate}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;
