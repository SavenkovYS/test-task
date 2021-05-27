import React from 'react';

import classes from './Input.module.css';

function Input({ type, name, value, changed, placeholder, min, max, valid, touched, label}) {
    const inputClasses = [classes.InputElement];

    if (!valid && touched) {
        inputClasses.push(classes.Invalid);
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{label}</label>
            <input
                className={inputClasses.join(' ')} 
                type={type} 
                name={name} 
                value={value}
                onChange={changed} 
                placeholder={placeholder}
                min={min}
                max={max}
            />
            {!valid && touched ? <p className={classes.Error}>Пожалуйста, введите корректные данные</p> : null}
        </div>
    );
}

export default Input;