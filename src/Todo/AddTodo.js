import React, {useState} from 'react';
import PropTypes from 'prop-types';


function useInputValue(defaultValue = "") { // создание своего хука
    const [value, setValue] = useState(defaultValue); //состояние этого валио - это пустая строка
    return {
        bind: { //тк мы используем свой собственный хук и не очищаем больше с помощью setValue('')
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }
}

function AddTodo({onCreate}) {
    const input = useInputValue('')
    function submitHandler(event) {
        event.preventDefault() // чтобы страница не перезагружалась
        if(input.value()/*value*//*value*/.trim()) { //с помощью этого метода удаляем лишние пробелы
            onCreate(input.value()/*value*//*value*/);
            //setValue('');
            input.clear(); // чтобы очистить значение
        }
    }
    return (
        <form style={{marginBottom: "1rem"}} onSubmit={submitHandler}>
            <input {...input.bind} /*value={value} onChange={event => setValue(event.target.value)}*/></input>
            <button type="submit">Add todo</button>
        </form>
    )
}

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo;