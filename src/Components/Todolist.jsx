import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
const Todolist = () => {
    const [todo, setTodo] = useState('');

    const [db, setDb] = useState([]);
    // data posting 
    function dataPost() {
        axios.post("http://localhost:3000/posts", { todo })
            .then(() => {
                alert("data has been posted")
                setTodo('')
            })
            .catch(() => {
                alert("data has not posted")
            })
    }

    function getData() {
        axios.get("http://localhost:3000/posts")
            .then((response) => {
                setDb(response.data)

            })
            .catch(() => {
                alert("data has not getted")
            })
    }

    function updateData(id, data) {
        axios.put(`http://localhost:3000/posts/${id}`, { todo: data })
            .then(() => {
                console.log("data updated");
                getData();

            })
            .catch(() => {
                console.log("data cannot update");

            })
    }

    function newData(id) {
        const data = prompt("enter the new data")
        updateData(id, data);
    }

    console.log(db)

    return (
        <div>
            <TextField
                id="outlined-basic"
                label="Todo" variant="outlined"
                value={todo}
                onChange={(ref) => setTodo(ref.target.value)}
            /> <br />
            <Button variant="contained" onClick={dataPost}>Post</Button>
            <Button variant="contained" onClick={getData}>Get</Button>

            <div>
                <ul>
                    {
                        db.map((item) => (
                            <li key={item.id}>{item.todo}<Button
                                onClick={() => newData(item.id)}>Edit</Button></li>
                        ))
                    }
                </ul>



            </div>

        </div>
    )
}

export default Todolist