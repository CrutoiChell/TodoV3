import s from "./Task.module.scss";
import { useEffect, useState } from "react";
import { useDeleteTaskMutation, useFetchEditTaskMutation } from "../../store/apiSlice";
import { ITask } from "../../types";

export function Task({ id, text, ischecked }: ITask) {
  const [deleteTask, { error }] = useDeleteTaskMutation();
  const [FetchEditTask] = useFetchEditTaskMutation();
  const [data, setData] = useState({ text, ischecked });

  useEffect(() => {
    setData({ text, ischecked });
  }, [text, ischecked]);

  const [isEdit, setIsEdit] = useState(false);

  async function terminateTask(e: React.FormEvent) {
    e.preventDefault();
    try {
      await deleteTask({ id, text, ischecked }).unwrap();
      if (error) return console.error(error);
    } catch (error) {
      console.error('ошибка', error);
    }
  }

  async function editTask(e: React.FormEvent | null, currentData: string | boolean, id: string | undefined) {
    if (e) e.preventDefault();
    try {
      await FetchEditTask({ id, currentData }).unwrap();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <li key={id} className={s.Task}>
      <input
        type="checkbox"
        checked={data.ischecked}
        onChange={(e) => {setData({ ...data, ischecked: e.target.checked }); editTask(e, e.target.checked, id);}}
      />
      <p>{text}</p>
      <button onClick={terminateTask}>delete</button>
      {isEdit ? (
        <>
          <input
            type="text"
            value={data.text}
            onChange={(e) => setData({ ...data, text: e.target.value })}
          />
          <button onClick={(e) => { setIsEdit(!isEdit); editTask(e, data.text, id); }}>save</button>
        </>
      ) : (
        <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
      )}
    </li>
  );
}