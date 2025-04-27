import React, { Component } from "react";
import "./Main.css";

import Tasks from "./Tasks";

export default class Main extends Component {
  state = {
    newTask: "",
    tasks: [],
  };

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) return;

    this.setState({ tasks });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state;

    if (tasks === prevState.tasks) return;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  handleChange = (event) => {
    this.setState({
      newTask: event.target.value,
    });
  };

  handleAdd = (event) => {
    event.preventDefault();
    if (this.state.newTask.trim()) {
      this.setState({
        tasks: [...this.state.tasks, this.state.newTask],
        newTask: "",
      });
    }
  };

  updateTasks = (newTasks) => {
    this.setState({ tasks: newTasks });
  };

  render() {
    const { newTask, tasks } = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>

        <form action="/" onSubmit={this.handleAdd}>
          <input
            className="main-input"
            type="text"
            onChange={this.handleChange}
            placeholder="Escreva sua tarefa"
            value={newTask}
          />
          <button type="submit">Adicionar</button>
        </form>

        <Tasks tasks={tasks} updateTasks={this.updateTasks} />
      </div>
    );
  }
}
