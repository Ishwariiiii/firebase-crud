import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useState } from "react";
import PopupBox from "./PopupBox";
import View from "./View";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Table = ({ tasks }) => {
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null)
  // console.log(tasks, "tasks data")

  const handleClose = () => {
    setOpen(false);
  }

  const handleClickOpen = (task) => {
    setOpen(true);
    setEditTask(task)
  };

  const handleCheckedChange = async (item) => {
    const newCompletedState = !item.data.completed;
    const taskDocRef = doc(db, "tasks", item.id);
    try {
      await updateDoc(taskDocRef, {
        completed: newCompletedState,
      });
    } catch (err) {
      alert(err);
    }
  };
  const handleDelete = async (id) => {
    const taskDocRef = doc(db, 'tasks', id)
    try {
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 h-[40%]">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4 font-sans">
              ChechBox
            </th>
            <th scope="col" className="px-6 py-3 font-sans">
              Title
            </th>
            <th scope="col" className="px-6 py-3 font-sans">
              Description
            </th>
            <th scope="col" className="px-6 py-3 font-sans">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((item, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input id="checkbox-table-search-1" checked={item.data.completed} onChange={() => handleCheckedChange(item)} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="checkbox-table-search-1" className="sr-only" >checkbox</label>
                </div>
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white font-mono">
                {item?.data?.title}
              </th>
              <td className="px-6 py-4 font-mono">
                {item?.data?.description}
              </td>
              <td className="flex items-center px-6 py-4 space-x-4">
                {/* Edit */}
                <FaRegEdit
                  className="h-[50%] w-[50px] pl-4 pr-3 text-black cursor-pointer"
                  onClick={() => handleClickOpen(item)}
                />

                {/* Delete*/}
                <MdDeleteForever
                  onClick={() => handleDelete(item.id)}
                  className="h-[90%] w-[30px] text-black cursor-pointer"
                />
                <View taskData={item} />
              </td>
              <PopupBox open={open} handleClose={handleClose} editTask={editTask} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Table