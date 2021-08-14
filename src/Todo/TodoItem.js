import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context';

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1 rem',
        border: '1px solid pink',
        borderRadius: '4px',
        marginBottom: '.5rem'
    },
    input: {
        marginRight: '1rem'
    }
}

function TodoItem({todo, index, onChange}) { //знаем ключ, поэтому сразу вписываем todo, а не props
    const {removeTodo} = useContext(Context) //для получения ключа для контекста - это id
    const classes = []; //для изменения классов
    if(todo.completed) {
        classes.push('done');
    }
    
    // classes.join() используем метод джойн, тк класснэйм принимаает только строки
    return (
        <li style={styles.li}>
            <span className={classes.join( ' ')}> 
                <input type="checkbox" checked={todo.completed} style={styles.input} onChange={() => onChange(todo.id)}></input>
                <strong>{index + 1}</strong>
                &nbsp;
                {todo.title} 
            </span>
            <button className="rm" onClick={() => removeTodo(todo.id)}>&times;</button> 
        </li> // хотим, чтобы выводились тайтлы из todos
        //функцию removeTodo(todo.id) используем как колбэк, потому что иначе сразу же будут удалятся элементы
        //второй способ для онклик - removeTodo.bind(null, todo.id)
    )
}

TodoItem.protoTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem;