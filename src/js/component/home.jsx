import React, { useState,useEffect } from "react";



//include images into your bundle

//create your first component
const Home = () => {
	
		const [inputByUser, setInputByUser] = useState("");
		const [tasks, setTasks] = useState([]);
		const apiUrl = "https://playground.4geeks.com/todo";
	  
		const pressEvent = (event) => {
		  if (event.key == "Enter") {
			if (event.target.value == "") {
			  return alert("Enter your task!");
			}
			addNewTask(inputByUser)
			setInputByUser("");
			
		  }
		};
	  
		const taskAdder = (event) => {
		  setInputByUser(event.target.value);
		};
	  
		
		const createUser = async () => { 
			try {
				const response = await fetch(`${apiUrl}/users/Iriagamb`, {method: "POST"}) 
				if (!response.ok){
					throw new Error ("No se pudo crear el usuario")
				}
				const data = await response.json() 
				console.log(data)
			} catch (error) {
				console.log(error)
			}
		}

		const getList = async () => { 
			try {
				const response = await fetch(`${apiUrl}/users/Iriagamb`) 
				if (!response.ok){
					throw new Error ("No se pudo obtener la lista")
				}
				const data = await response.json() 
				console.log(data)
				setTasks (data.todos)
			} catch (error) {
				console.log(error)
			}
		}

		const addNewTask = async (newTask) => { 
			try {
				const response = await fetch(`${apiUrl}/todos/Iriagamb`, {
					method: "POST",
					body: JSON.stringify(
						{
							"label": newTask,
							"is_done": false
						  }
					),
					headers: {
						"Content-Type": "application/json"
					}
				}) 
				if (!response.ok){
					throw new Error ("No se pudo agregar la tarea")
				}
				const data = await response.json() 
				console.log(data) 
				setTasks([...tasks,data])
			} catch (error) {
				console.log(error)
			}
		}

		const deleteTask = async (id) => { 
			try {
				const response = await fetch(`${apiUrl}/todos/${id}`, {method: "DELETE"}) 
				if (!response.ok){
					throw new Error ("No se pudo eliminar la tarea")
				}
				const data = await response
				console.log(data)
				const newArray = tasks.filter(item => item.id != id )
				setTasks(newArray)
			} catch (error) {
				console.log(error)
			}
		}
 
		useEffect(() => {
			createUser()
			getList()
		}, [])



	

		return (
		  <div className="container">
			<h1 className="text-center">Todos</h1>
			<div className="card  border border-4">
			  <div className="mt-3">
				<input
				  type="text"
				  className="form-control"
				  value={inputByUser}
				  onChange={taskAdder}
				  placeholder="Ingresa tu tarea "
				  onKeyDown={pressEvent}
				/>
			  </div>
			  <div className="tasks-section mt-3 mx-1">
				{tasks.length == 0 ? (
				  <span>No hay tareas, por favor añade tareas </span>
				) : (
				  tasks.map((task) => (
					<div
					  key={task.id}
					  className="task justify-content-between text-start container d-flex my-2"
					>
					  <p>{task.label}</p>
					  <button type="button" class="btn-close" aria-label="Close"
						onClick={() => deleteTask(task.id)}
					  >
						
					  </button>
					</div>
				  ))
				)}
			  </div>
			</div>
			<div className="card-footer">
			  <p>Tareas agregadas {tasks.length}</p>
			</div>
		  </div>
		
	);
  };

export default Home;