import React, { Component } from 'react'

import './Main.css'
import Input from '../Input/Input'
import Task from '../Task/Task'

class Main extends Component {
  state = {
    tasks: [],
    filteredTasks: [],
  }

  newTask = ''

  taskInputHandler = (event) => {
    this.newTask = event.target.value
  }

  addTaskHandler = () => {
    const newArray = [...this.state.tasks]
    newArray.push({ taskName: this.newTask })
    this.setState({ tasks: newArray })
    this.setArrayToLocalStorage(newArray)
  }

  finishTaskHandler = (taskIndex) => {
    const newArray = [...this.state.tasks]
    newArray.splice(taskIndex, 1)

    this.setState({ tasks: newArray })
    this.setArrayToLocalStorage(newArray)
  }

  editTaskHandler = (index) => {
    const newArray = [...this.state.tasks]
    let newTaskName = prompt('Edite a task', newArray[index].taskName)
    newArray[index].taskName = newTaskName

    this.setState({ tasks: newArray })
    this.setArrayToLocalStorage(newArray)
  }

  filterItems = (query) => {
    return this.state.tasks.filter(function (task) {
      return task.taskName.toLowerCase().indexOf(query.toLowerCase()) > -1
    })
  }

  searchInputHandler = (event) => {
    const newArray = [...this.filterItems(event.target.value)]
    this.setState({ filteredTasks: newArray })
  }

  setArrayToLocalStorage = (array) => {
    localStorage.setItem('tasks', JSON.stringify(array))
  }

  componentDidMount() {
    if (localStorage.getItem('tasks') !== null) {
      this.setState({ tasks: JSON.parse(localStorage.getItem('tasks')) })
    }
  }

  render() {
    let tasks = null
    let search = null

    if (this.state.tasks.length >= 1) {
      tasks = this.state.tasks.map((task, index) => {
        return (
          <Task
            key={index}
            taskName={task.taskName}
            finish={() => this.finishTaskHandler(index)}
            edit={() => this.editTaskHandler(index)}
          />
        )
      })
    }

    if (this.state.filteredTasks.length >= 1) {
      search = this.state.filteredTasks.map((task, index) => {
        return (
          <Task
            key={index}
            taskName={task.taskName}
            finish={() => this.finishTaskHandler(index)}
            edit={() => this.editTaskHandler(index)}
          />
        )
      })
    }

    return (
      <div className="main">
        <div className="input">
          <Input
            icon="add-outline"
            placeh="Add Task"
            changed={this.taskInputHandler}
            click={this.addTaskHandler}
          />
          <Input
            icon="search-outline"
            placeh="Search"
            changed={this.searchInputHandler}
          />
        </div>
        <div className="tasks">{search != null ? search : tasks}</div>
      </div>
    )
  }
}

export default Main
