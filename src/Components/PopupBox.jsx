import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const PopupBox = ({ open, handleClose, editTask }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // console.log(editTask, "edit data")

    const handleUpdate = async (id) => {
        const taskDocRef = doc(db, 'tasks', id)
        try {
            await updateDoc(taskDocRef, {
                title: title,
                description: description
            })
            handleClose()
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        setTitle(editTask?.data?.title)
        setDescription(editTask?.data?.description)
    }, [editTask])

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',

                }}
            >
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <TextField         
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        name="title"
                        label="TItle"
                        type="text"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button  onClick={()=>handleUpdate(editTask?.id)} className="text-black">Edit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default PopupBox;