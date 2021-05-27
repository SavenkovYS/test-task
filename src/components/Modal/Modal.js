import React from 'react';

import classes from './Modal.module.css';

function Modal({ children }) {
    return (
        <div className={classes.Modal}>
            <p>{children}</p>
        </div>
    );
}

export default Modal;