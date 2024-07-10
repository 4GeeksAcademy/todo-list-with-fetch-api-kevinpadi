import React, { useState } from 'react'

const ListItem = ({todo, handleDelete}) => {
    return(
        <li key={todo.id} className="list-group-item d-flex justify-content-between bg-black text-light border border-start-0 border-top-0 border-end-0 border-secondary rounded-0 p-2">
			{todo.label}
		    <button onClick={() => handleDelete(todo.id)} className="bg-black border border-0 p-0">✖</button>
		</li>
    )
}

export default ListItem