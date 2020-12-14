import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useForm } from "react-hook-form";

function TodoForm({ addTodo }) {
  const { register, handleSubmit } = useForm();
  return (
    <form className={styles.inputTodo} onSubmit={handleSubmit(addTodo)}>
      <span></span>
      <input type="text" name="todo" placeholder="Create a new todo..." ref={register({ required: true })} />
    </form>
  );
}

function Todo({ todoList, completeTodo, removeTodo }) {
  return todoList.map((todo, index) => {
    return (
      <div className={styles.selectTodo} key={index}>
        {todo.complete ? (
          <span onClick={() => completeTodo(index)} className={styles.completeTodo}><img src="/images/icon-check.svg" alt="check-todo" /></span>
        ) : (
            <span onClick={() => completeTodo(index)}></span>
          )}
        {todo.complete ? (
          <p onClick={() => completeTodo(index)} className={styles.checkTodo}>{todo.name}</p>
        ) : (
            <p onClick={() => completeTodo(index)}>{todo.name}</p>
          )}
        <img onClick={() => removeTodo(index)} src="/images/icon-cross.svg" alt="remove-todo" />
      </div>);
  })

}

function MenuTodo({ filterStatus, todoList, itemLeft, selectStatus, clearTodoComplete }) {
  if (todoList) {
    return (<div className={styles.menuTodo}>
      <p className={styles.itemLeft}>{itemLeft()} items left</p>
      <ul className={styles.filterTodo}>
        <li onClick={() => selectStatus('')} style={{ color: filterStatus === '' ? "hsl(220, 98%, 61%)" : "" }}>All</li>
        <li onClick={() => selectStatus(false)} style={{ color: filterStatus === false ? "hsl(220, 98%, 61%)" : "" }}>Active</li>
        <li onClick={() => selectStatus(true)} style={{ color: filterStatus === true ? "hsl(220, 98%, 61%)" : "" }}>Completed</li>
      </ul>
      <p className={styles.clearCompleted} onClick={clearTodoComplete}>Clear Completed</p>
    </div>
    )
  }
}

export default function Home() {
  const [isDarkMode, setDarkMode] = useState(true)
  const [todoList, setTodoList] = useState([
    { name: "Complete online Javascript course", complete: true },
    { name: "Jog around the park 3x", complete: false },
    { name: "10 minintes meditation", complete: false },
    { name: "Read for 1 hour", complete: false },
    { name: "Pick up groceries", complete: false },
    { name: "Complete Todo App on Frontend Mentor", complete: false }
  ])
  const [filterTodoList, setfilterTodoList] = useState(todoList)
  const [filterStatus, setFilterStatus] = useState('')
  const changeColorMode = () => {
    setDarkMode(!isDarkMode)
  }
  // do something in todo list
  const addTodo = (data, e) => {
    const newTodos = [...todoList, { name: data.todo, complete: false }];
    updateTodo(newTodos)
    e.target.reset();
  }
  const completeTodo = (index) => {
    const newTodos = [...todoList];
    newTodos[index].complete = !newTodos[index].complete;
    updateTodo(newTodos)
  }
  const removeTodo = (index) => {
    const newTodos = [...todoList];
    newTodos.splice(index, 1);
    updateTodo(newTodos)
  }
  const updateTodo = (todoList) => {
    setTodoList(todoList)
    setfilterTodoList(todoList)
  }
  // filter todo list
  const itemLeft = () => {
    let filterList = todoList.filter(value => value.complete == false)
    return filterList.length
  }
  const selectStatus = (status) => {
    setFilterStatus(status)
    if (status === '') {
      setfilterTodoList(todoList)
    } else {
      let filterList = todoList.filter(value => value.complete == status)
      setfilterTodoList(filterList)
    }
  }
  const clearTodoComplete = () => {
    const newTodos = [...todoList];
    const filters = newTodos.filter(value => value.complete === false)
    updateTodo(filters)
  }
  let colorMode = isDarkMode ? `${styles.main} ${styles.dark}` : `${styles.main} ${styles.light}`
  return (
    <div className={styles.container}>
      <Head>
        <title>To Do List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={colorMode}>
        <div className={styles.header}>
          <h1>TODO</h1>
          {isDarkMode ?
            (<img onClick={changeColorMode} src="/images/icon-sun.svg" alt="dark-mode-icon" />) :
            (<img onClick={changeColorMode} src="/images/icon-moon.svg" alt="light-mode-icon" />)
          }
        </div>
        <div className={styles.todo}>
          <TodoForm addTodo={addTodo} />
          <div className={styles.todoList}>
            <Todo
              todoList={filterTodoList}
              completeTodo={completeTodo}
              removeTodo={removeTodo} />
            <MenuTodo
              filterStatus={filterStatus}
              todoList={filterTodoList}
              itemLeft={itemLeft}
              selectStatus={selectStatus}
              clearTodoComplete={clearTodoComplete} />
          </div>
        </div>
      </main>
    </div>
  )
}
