"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Todo = () => {

  useEffect(()=>{
    router.push('/?todo=active')
  
  
  },[])
  const [addTask, setTask] = useState("");
  const router = useRouter();
  const query = useSearchParams();
  const search = query.get("todo");

  const [allTask, setAllTask] = useState<any>();

  const generateNumber = (length: number) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };

  const addTodo = (data: any, e: any) => {
    e.preventDefault();
    if(data?.length == 0){
    
    alert("Task input can't be empty")
    
    }else{
      setTask(data);
      const input: any = {
        completed: false,
        task: addTask,
        id: generateNumber(5),
      };
      const existingTodos: any = JSON.parse(localStorage.getItem("todo") || "[]");
  
      existingTodos.push(input);
  
      localStorage.setItem("todo", JSON.stringify(existingTodos));
  
      setTask("");
    
    }
   
   
  };

  const handleGetTodos = () => {
    const getTasks: any = JSON.parse(localStorage.getItem("todo") || "[]");
    setAllTask(getTasks);
    return getTasks;
  };

  useEffect(() => {
    handleGetTodos();
  }, [addTask]);

  //   console.log("alltasks", allTask);

  const clickFalse = (todoID: string) => {
    const existingTodos: any = JSON.parse(localStorage.getItem("todo") || "[]");
    const res = existingTodos?.findIndex((item: any) => {
      return item?.id === todoID;
    });
    if (res !== -1) {
      existingTodos[res].completed = true;
      localStorage.setItem("todo", JSON.stringify(existingTodos));
      handleGetTodos();
    }
  };

  return (
    <>
      <div className="flex items-center flex-col align-middle justify-center gap-8 mt-10 container max-w-6xl mx-auto">
        <div className="heading">
          <h1 className="text-2xl text-green-400 font-semibold">TODO LIST</h1>
        </div>
        <div className="input">
          <form action="" onSubmit={(e) => addTodo(addTask, e)}>
            <input
              className="h-10 w-96  rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              value={addTask}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Add task"
            ></input>

            <button
              type="submit"
              className="cursor-pointer m-2 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add
            </button>
          </form>
        </div>

        <div className="flex flex-row gap-36">
          <div
            className={`cursor-pointer text-md font-bold text-pretty  ${
              search === "all" ? "active" : ""
            }`}
            onClick={() => router.push("/?todo=all")}
          >
            All
          </div>
          <div
            className={`cursor-pointer text-md font-bold text-pretty ${
              search === "active" ? "active" : ""
            } `}
            onClick={() => router.push("/?todo=active")}
          >
            Active
          </div>
          <div
            className={`cursor-pointer text-md font-bold text-pretty ${
              search === "completed" ? "active" : ""
            }`}
            onClick={() => router.push("/?todo=completed")}
          >
            Completed
          </div>
        </div>
        {/* <hr  className="bg-red h-16 px-3 py-44 w-96 mx-auto"/> */}

        {allTask &&
          search === "active" &&
          allTask
            ?.filter((data: any) => !data?.completed)
            .map((data: any, i: any) => (
              <div  key={i}>
                <input
                  key={i}
                  type="checkbox"
                  id={data.id}
                  name={data?.task}
                  value={data?.task}
                  checked={data?.completed}
                  onClick={() => {
                    clickFalse(data?.id);
                  }}
                />
                <label htmlFor="vehicle1"    key={i}> {data?.task}</label>
                <br></br>
              </div>
            ))}
        {allTask && search === "completed" && (
          <div className="flex flex-col w-full items-start">
            {allTask
              ?.filter((data: any) => data?.completed)
              .map((data: any, i: any) => (
                <div className=" flex flex-row text-left align-middle items-start"  key={i}>
                  {/* <input
                  key={i}
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                  // onClick={() => clickFalse(i)}
                /> */}
                  <span>
                    <svg
                      height="22"
                      viewBox="0 0 48 48"
                      width="48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z" />
                      <path d="M0 0h48v48H0z" fill="none" key={data?.id} />
                    </svg>
                  </span>
                  <label
                    htmlFor="vehicle1"
                    className="line-through text-green-600"
                    key={i}
                  >
                    {" "}
                    {data?.task}
                  </label>
                  <br></br>
                </div>
              ))}
          </div>
        )}
        {allTask &&
          search === "all" &&
          allTask.map((data: any, i: any) => (
            <div  key={i}>
              <input
                key={i}
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
                // onClick={() => clickFalse(i)}
              />
              <label htmlFor="vehicle1"    key={i}> {data?.task}</label>
              <br></br>
            </div>
          ))}
      </div>
    </>
  );
};

export default Todo;
