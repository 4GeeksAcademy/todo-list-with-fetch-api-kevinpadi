import React, { useState, useEffect } from "react";
import ListItem from "./listItem";

const Home = () => {
	const [ todo, setTodo ] = useState('')
	const [ todos, setTodos ] = useState([])
	const URL = 'https://playground.4geeks.com/todo'
	const USER = 'kevinpadi'

	const handleSubmit = (e) => {
		e.preventDefault()
		if(todo !== '') {
			createTodo() 
			setTodo('') 
		}
	}

	const handleDelete = (id) => {
		deleteTodo(id)
	}

	function createUser() {
		fetch(`${URL}/users/${USER}`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			}

		})
		.then((resp) => {
			if(resp.status === 201) {
				getTodos()
			}
			return resp.json()
		})
		.catch(error => console.log(error))
	
	}
	
	function getTodos() {
		fetch(`${URL}/users/${USER}`)
		.then((resp) => {
			if( resp.status === 404 ) {
				createUser()
			}
			return resp.json()
		})
		.then(data => setTodos(data.todos))
		.catch(error => console.log(error))
	}

	function createTodo() {
		fetch(`${URL}/todos/${USER}`, {
			method: 'POST',
			body: JSON.stringify({
				"label": todo
			}),
			headers: {
				"Content-Type": "application/json"
			},

		})
		.then((resp) => {
			if(resp.status === 201) {
				getTodos()
			}
			return resp.json()
		})
		.catch(error => console.log(error))
	
	}

	function deleteTodo(id) {
		fetch(`${URL}/todos/${id}`, {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json"
			},
		})
		.then((resp) => {
			if(resp.status === 204) {
				getTodos()
			}
		})
		.catch(error => console.log(error));
	}

	useEffect(() => {
		getTodos()
	}, [])

	return (
		<div className="container-fluid w-100 vh-100 bg-dark d-flex flex-column align-items-center pt-3">
			<h1 className="text-secondary fw-light mb-5" style={{fontSize: '100px'}}>todos</h1>
			<div className="w-75 rounded bg-black shadow-lg p-3">
				<form onSubmit={handleSubmit} className='d-flex w-100 pb-1'>
					<input name="input" id="input" value={todo} onChange={(e) => {setTodo(e.target.value)}} type="text" className="form-control bg-black text-light border border-start-0 border-top-0 border-end-0 border-secondary rounded-0 p-2" aria-describedby="emailHelp" placeholder="What needs to be done?" />
				</form>
				<ul className="list-group">
					{todos.length !== 0 ? todos.map((todo, index) =>
						<ListItem key={todo.id} todo={todo} index={index} handleDelete={handleDelete} />
					) : <label htmlFor="input" className="text-center py-3 fs-1">No hay tareas, añadir tareas</label>}
				</ul>
				<div>
					<span style={{fontSize: '14px'}}>{todos.length} todos left</span>
				</div>
			</div>
		</div>
	);
};

export default Home;
