import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const styles = {
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    }
}

function TodoList(props) { //через пропс получаем массив объектов todos
    return (
      <ul style={styles.ul}>
        {props.todos.map((todo, index) => {
            return <TodoItem todo={todo} key={todo.id} index={index} onChange={props.onToggle} /> //чтобы пройтись циклом по массиву объектов и передать ключ todo,
            //ключ передаем, чтобы не было ошибки
            //название index выбрали сами и также его передали в компонент
        })}
      </ul> 
    )
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onToggle: PropTypes.func.isRequired //обращаемся к библиотеке проптайпс и определяем свойства входящего объекта
    //это, как в ангуляре, когда что-то декларируем, чтобы не было неприемлимых свойств
    //isRequired значит, что он служит для работы данного компонента
}
//prop-types используем, чтобы определять входящие свойства, чтобы не было ошибок
export default TodoList;