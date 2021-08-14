import React, {useEffect} from 'react'; //чтобы отследить, когда будет готово дом-дерево
import TodoList from './Todo/TodoList';
import Context from './context'; // служит для того, чтобы передавать некоторые функции сквозь другие компоненты
//import AddTodo from './Todo/AddTodo'; удаляем, чтобы рассмотреть процесс ленивой загрузки (лэйзилоадинг)
import Loader from './Loader';
import Modal from './Modal/Modal';

const AddTodo = React.lazy(() => import('./Todo/AddTodo')); //для медленной загрузки


function App() {
  const [todos, setTodos] = React.useState(//useState всегда возвращает 2 элемента: массив, который равен дефолтному состоянию,
    //и функцию, которая будет изменять данное состояние 
    //[todos, setTodos] - это деструктиризация, которая принимает массив и функцию, которая его преобразует
    [
      /*{id: 1, completed: false, title: 'Buy bread'},
      {id: 2, completed: false, title: 'Buy milk'},
      {id: 3, completed: false, title: 'Buy shake'}*/
    ]
  )
  const [loading, setLoading] = React.useState(true)//заводим новый стэйт для загрузки 
  // true потому что точно будет процесс загрузки, тк установлено время на 2 сек
 
  useEffect (() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5') // чтобы получать значения с сервера
    //поэтому мы можем удалить массив
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false); //для того, чтобы лоадер исчезал после 2 сек
        }, 2000);
      })
  }, [])// вторым параметром передаем пустой массив для того, чтобы
  //передать список зависимостей по колбэку, но тк нам надо, чтобы он отработал только 1 раз
  // то передаем пустой массив

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }
//первые фигурные скобки - это как ковычки, а вторые - какое свойство передаем
  return (
    <Context.Provider value={{removeTodo: removeTodo}}>
      <div className='wrapper'>
        <h1>React tutorial</h1>
        <Modal />
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        {loading && <Loader />} 
        {todos.length ? (<TodoList todos={todos} onToggle={toggleTodo} />) : (loading ? null : <p>No todos!</p>)}
      </div>
    </Context.Provider>
  )
}
//если переменная лоадинг находится в состоянии тру, то показывать компонент лоадер
//реакт. саспенз - для того, чтобы реакт понял, что мы грузим компонент лениво

export default App;
