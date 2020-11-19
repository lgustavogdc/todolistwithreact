import React, { Component } from "react"

import './Main.css';
import Input from '../Input/Input'
import Task from '../Task/Task'

class Main extends Component {
    newTask = '';

    state = {
        tasks: [],
        filteredTasks: []
    }

    taskInputHandler = (event) => {
        this.newTask = event.target.value
    }


    addTaskHandler = () =>{
        const newArray = [...this.state.tasks]
        newArray.push({taskName:this.newTask})
        this.setState({tasks:newArray}) 
    }

    finishTaskHandler = (taskIndex) =>{
        const newArray = [...this.state.tasks]
        newArray.splice(taskIndex, 1);

        this.setState({tasks:newArray})
    }

    editTaskHandler = (index) => {
        const newArray = [...this.state.tasks]
        let newTaskName = prompt("Edite a task", newArray[index].taskName)
        newArray[index].taskName = newTaskName;

        this.setState({tasks:newArray})
    }

    filterItems = (query) => {
        return this.state.tasks.filter(function(task) {
            return task.taskName.toLowerCase().indexOf(query.toLowerCase()) > -1;
        })
      }

      searchInputHandler = (event) => {
        const newArray = [...this.filterItems(event.target.value)]
        this.setState({filteredTasks:newArray})
    }   

    render(){
        let tasks = null;
        let search = null;

        if(this.state.tasks.length >= 1){
            tasks=this.state.tasks.map((task, index) => {
                return <Task 
                    key={index} 
                    taskName={task.taskName} 
                    finish={() => this.finishTaskHandler(index)}
                    edit={() => this.editTaskHandler(index)}
                    />
            })
        }

        if(this.state.filteredTasks.length >= 1){
            search = this.state.filteredTasks.map((task,index) =>{
                return <Task 
                        key={index} 
                        taskName={task.taskName} 
                        finish={() => this.finishTaskHandler(index)}
                        edit={() => this.editTaskHandler(index)}
                        />
            })
        }


    return (
        <div className ="main">
            <div className="input">
                <Input icon="add-outline" placeh="Add Task" changed={this.taskInputHandler} click={this.addTaskHandler}/>
                <Input icon="search-outline" placeh="Search" changed={this.searchInputHandler} />
            </div>
            <div className="tasks">
                {search != null ? search : tasks}
                
                
            </div>
        </div>
    )
}
}

export default Main;