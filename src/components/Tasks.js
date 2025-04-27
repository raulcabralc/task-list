import React, { Component } from "react";
import "./Tasks.css";

export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: true,
      deleteMode: false,
      editingIndex: null,
      editedTask: "",
    };

    this.markEdit = this.markEdit.bind(this);
    this.markDelete = this.markDelete.bind(this);
    this.handleLiClick = this.handleLiClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  markEdit() {
    this.setState({
      editMode: true,
      deleteMode: false,
    });
  }

  markDelete() {
    this.setState({
      editMode: false,
      deleteMode: true,
      editingIndex: null,
    });
  }

  handleLiClick(index) {
    if (this.state.editMode) {
      this.setState({
        editingIndex: index,
        editedTask: this.props.tasks[index],
      });
    } else if (this.state.deleteMode) {
      this.deleteLi(index);
    }
  }

  handleInputChange(e) {
    this.setState({
      editedTask: e.target.value,
    });
  }

  handleInputKeyDown(e) {
    if (e.key === "Enter") {
      this.saveEdit();
    }
  }

  handleInputBlur() {
    this.saveEdit();
  }

  saveEdit() {
    const { editingIndex, editedTask } = this.state;
    if (editingIndex !== null) {
      const newTasks = [...this.props.tasks];
      newTasks[editingIndex] = editedTask;

      if (this.props.updateTasks) {
        this.props.updateTasks(newTasks);
      }

      this.setState({ editingIndex: null });
    }
  }

  deleteLi(index) {
    const newTasks = [...this.props.tasks];
    newTasks.splice(index, 1);

    if (this.props.updateTasks) {
      this.props.updateTasks(newTasks);
    }
  }

  render() {
    const { tasks } = this.props;
    const { editMode, deleteMode, editingIndex, editedTask } = this.state;

    return (
      <>
        {tasks.length > 0 ? (
          <>
            <div className="edit-delete">
              <button
                onClick={this.markEdit}
                className={editMode ? "active edit-btn" : "edit-btn"}
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                onClick={this.markDelete}
                className={deleteMode ? "active del-btn" : "del-btn"}
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
        <ul className="tasks">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li
                onClick={() => this.handleLiClick(index)}
                className={`${editMode ? "edit-mode" : ""} ${
                  deleteMode ? "delete-mode" : ""
                }`}
              >
                {editingIndex === index ? (
                  <input
                    class="edit-input"
                    type="text"
                    value={editedTask}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleInputKeyDown}
                    onBlur={this.handleInputBlur}
                    autoFocus
                    onClick={(e) => e.stopPropagation}
                  />
                ) : (
                  task
                )}
              </li>
            ))
          ) : (
            <h2>Você ainda não adicionou nenhuma tarefa.</h2>
          )}
        </ul>
      </>
    );
  }
}
