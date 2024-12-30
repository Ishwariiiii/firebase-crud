import React, { useState, useEffect } from "react";
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from "../firebase-config";
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from "./Table";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'tasks'), {
        title: title,
        description: description,
        completed: false,
        created: Timestamp.now(),
      });
      setTitle("");
      setDescription("");
    } catch (err) {
      alert(err);
    }
  };
  
  return (
    <div className="bg-gray-900 h-screen w-full text-blue-200 flex flex-col justify-center items-center">

      <h1 className="font-extrabold text-3xl text-center mb-6">CRUD with Firebase</h1>
      <Box
        className="bg-slate-800 text-white p-6 rounded-lg shadow-lg w-[40%]"
        component="form"
        sx={{
          '& > :not(style)': { m: 2, width: '100%' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          className="bg-slate-700 text-white"
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          className="bg-slate-700 text-white mt-4"
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-4 w-full"
        >
          Save
        </Button>

      </Box>
      <Table tasks={tasks} />
    </div>
  );
};
export default AddTask;