import React from 'react';
import './Modal.css';

export default class Modal extends React.Component {
    state = { //не хуки, а классический способ создания стейта
        isOpen: false
    }
    render() {
        return (
            <React.Fragment> 
                <button onClick={() => this.setState({isOpen: true})}>Open modal</button>
                {this.state.isOpen && (
                    <div className="modal">
                        <div className="modal-body">
                            <h1>Modal title</h1>
                            <p>I am awesome modal</p>
                            <button onClick={() => this.setState({isOpen: false})}>Close modal</button>
                        </div>
                    </div>)
                }
            </React.Fragment>
        )
    }
}
//реакт фрагмент - для того, чтобы реакт не добавлял никакого корневого элемента