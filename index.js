import { saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask } from './firebase.js'

const tasksContainer = document.getElementById('tasks-container')
const taskForm = document.getElementById("task-form")

let editStatus = false
let taskId = ''

window.addEventListener('DOMContentLoaded', async () => {
  onGetTasks((querySnapshot) => {

    tasksContainer.innerHTML = ``

    querySnapshot.forEach((doc) => {
      const task = doc.data()
      tasksContainer.innerHTML += `
        <div class="card card-body my-2" >
          <h3 class="h5">${task.title}</h3>
          <p>${task.description}</p>
          <div class="d-flex">
            <button class='btn btn-info btn-delete m-1' data-id="${doc.id}">Delete</button>
            <button class='btn btn-success btn-edit m-1' data-id="${doc.id}">Edit</button>
          </div>
        </div>
      `
    })

    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', ({target: { dataset }}) => {
        deleteTask(dataset.id)
      })
    })

    const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async ({target: { dataset }}) => {
        const doc = await getTask(dataset.id)
        if(!doc) throw new Error("Task not found")
        const task = doc.data()
        taskForm['task-title'].value = task.title
        taskForm['task-description'].value = task.description
        editStatus = true
        taskId = doc.id
        taskForm['btn-task-save'].innerHTML = "Update"
      })
    })

  })
})

taskForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const title = taskForm['task-title']
  const description = taskForm['task-description']

  if(editStatus) {
    updateTask(taskId, {title: title.value, description: description.value})
    editStatus = false
    taskForm['btn-task-save'].innerHTML = "Save"
  } else {
    if(title.value !== "" && description.value !== ""){
      saveTask(title.value, description.value)
    } else {
      alert("Fields required")
    }
  }
  taskForm.reset()
})