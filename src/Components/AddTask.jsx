import React, { useState } from "react";
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import { db } from "../firebase-config";
import { IoMdAdd } from "react-icons/io";


const AddTask = () => {
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'tasks'), {
        title: title,
        description: description,
        completed: false,
        created: Timestamp.now()
      })
    } catch (err) {
      alert(err)
    }
  }
  return (
    <div>
      <IoMdAdd className="h-[20%] w-[3%] bg-orange-500"/>
        <form onSubmit={handleSubmit} className='addTask' name='addTask'>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} name="title" placeholder="Title"/>
            <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} name="description" placeholder="Description"/>
            <button type="submit">Save</button>
        </form>
    </div>
  )
};

export default AddTask;
