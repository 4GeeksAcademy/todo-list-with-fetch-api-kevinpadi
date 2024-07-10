import React, { useState } from 'react'

const ListItem = ({todo, handleDelete, editTodo}) => {
    const [ toggleEdit, setToggleEdit ] = useState(true)
    const [ editedTodo, setEditedTodo ] = useState(todo.label)

    const handleEditSubmit = (e) => {
		e.preventDefault()
		if(editedTodo !== '') {
			editTodo(todo.id, editedTodo)
            console.log(todo.id, editedTodo)
            setToggleEdit(!toggleEdit)
		}
	}

    const handleCancelEdit = (e) => {
        e.preventDefault();
        setEditedTodo(todo.label);
        setToggleEdit(true);
    };

    return(
        <li key={todo.id} className="list-group-item d-flex justify-content-between bg-black text-light border border-start-0 border-top-0 border-end-0 border-secondary rounded-0 p-2">
			{
                toggleEdit ? (
                    <>
                        {todo.label}
                        <div className='d-flex gap-1'>
                            <button onClick={() => setToggleEdit(false)} className="border rounded border-0 p-1">✏</button>
                            <button onClick={() => handleDelete(todo.id)} className="border rounded border-0 p-1">✖</button>
                        </div>
                    </>
                )
                    
                 : (
                    <form onSubmit={handleEditSubmit}  className='d-flex w-100 pb-1'>
                        <input value={editedTodo} onChange={(e) => {setEditedTodo(e.target.value)}} name="input" id="input" type="text" className="form-control bg-black text-light border-0 rounded-0 pl-0 p-2" aria-describedby="emailHelp" placeholder="What needs to be done?" />
                        <button type='button' onClick={handleCancelEdit} className="border rounded border-0 p-1">✖</button>
                    </form>
                 )
            }
		</li>
    )
}

export default ListItem