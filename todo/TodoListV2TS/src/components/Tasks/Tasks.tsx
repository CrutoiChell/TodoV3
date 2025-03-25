// import s from "./Tasks.module.scss"
import { useFetchAllTasksQuery } from "../../store/apiSlice";
import { ITask } from "../../types";
import { Task } from "../Task/Task";

export function Tasks() {

  let { data, isLoading, error, isError } = useFetchAllTasksQuery()

  if (isLoading) return <p>Loading</p>

  if (isError && error?.status === 401) {
    return <p>Зарегистрируйтесь</p>;
  }

  if (isError) {
    console.log(error);
    return <p>{error.data.error}</p>;
  }

  if (!data) {
    console.log("нет данных");
    return <p>Нет данных</p>;
  }
 
  if (!data) return console.log('нет данных');
  
  return (
    <ul>
      {data.map((el: ITask) => {
        return (
          <Task
            key={el.id}
            id={el.id}
            text={el.text}
            ischecked={el.ischecked}
          />
        )
      })}
    </ul>
  );
}

