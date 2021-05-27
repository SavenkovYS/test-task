import React, { useState } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

import Modal from '../Modal/Modal';
import Input from '../../components/Input/Input';

import classes from './CallDoctor.module.css';

function CallDoctorData() {
    const [inputValue, setInputValue] = useState({
        fullname: {
            value: '',
            validation: {
                length: 3,
                required: true
            },
            valid: false,
            touched: false
        },
        date: {
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    });

    const [addressInput, setAddressInput] = useState();
    const [orderNumber, setOrderNumber] = useState();
    const [isFormValid, setIsFormValid] = useState(true);
    const [success, setSuccess] = useState(false);

    function inputChangeHandler(evt) {
        let {value, name} = evt.target;
        setInputValue(prevValue => {
            return {
                ...prevValue,
                [name]: {
                    ...prevValue[name],
                    value: value,
                    touched: true,
                    valid: checkValidity(value, inputValue[name].validation)
                }
            }
        });
    }

    function submitFormHandler(evt) {
        evt.preventDefault();
        if (checkFormValidity() && addressInput) {
            const nameAbbreviation = inputValue.fullname.value.split(' ').map(el => el[0].toUpperCase()).join('');
            const orderNumber = `${addressInput.data.country}/${addressInput.data.country_iso_code}/${nameAbbreviation}/${addressInput.data.geo_lat}/${addressInput.data.geo_lon}/${inputValue.date.value}`
            setOrderNumber(orderNumber);
            setSuccess(true);
        } else {
            for (const key in inputValue) {
                inputValue[key].touched = true;
            }
        }
    }

    function checkFormValidity() {
        let isValid = true;

        for (const key in inputValue) {
            isValid = inputValue[key].valid && isValid;
        }

        setIsFormValid(isValid);
        return isValid;
    }

    function checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.length) {
            isValid = value.trim().split(' ').filter(char => char !== ' ').length === rules.length && isValid;
        }

        return isValid;
    }

    function setMaxDate() {
        const currentTime = new Date();
        const maxDate = new Date(currentTime.setDate(currentTime.getDate() + 14));
        const maxMonth = maxDate.getMonth() + 1 > 9 ? maxDate.getMonth() + 1 : `0${maxDate.getMonth() + 1}`;
        const maxDay = maxDate.getDate() > 9 ? maxDate.getDate() : `0${maxDate.getDate()}`;
        return `${maxDate.getFullYear()}-${maxMonth}-${maxDay}`;
    }

    function setMinDate() {
        const currentTime = new Date();
        const minMonth = currentTime.getMonth() + 1 > 9 ? currentTime.getMonth() + 1 : `0${currentTime.getMonth() + 1}`;
        const minDay = currentTime.getDate() > 9 ? currentTime.getDate() : `0${currentTime.getDate()}`;
        return `${currentTime.getFullYear()}-${minMonth}-${minDay}`;
    }

    return (
        success 
        ? <Modal>Номер Вашего заказа: {orderNumber}</Modal> 
        : (
            <form className={classes.CallDoctor} action="#" method="POST" onSubmit={evt => submitFormHandler(evt)}>
                <Input
                    label={'Как Вас зовут'}
                    type="text" 
                    name="fullname" 
                    value={inputValue.fullname.value}
                    changed={evt => inputChangeHandler(evt)} 
                    placeholder="Иванов Иван Иванович"
                    valid={inputValue.fullname.valid}
                    touched={inputValue.fullname.touched}
                />
                <div>
                    <label className={classes.Label}>Введите Ваш адрес</label>
                        <AddressSuggestions 
                        token="e7d57dfbfd90e3817dd37d568d7819d2bd160b82" 
                        value={addressInput} 
                        onChange={setAddressInput} 
                    />
                </div>
                
                <Input
                    label="На какую дату Вы хотели бы вызвать врача"
                    type="date" 
                    name="date" 
                    value={inputValue.date.value} 
                    changed={evt => inputChangeHandler(evt)}
                    max={setMaxDate()}
                    min={setMinDate()}
                    valid={inputValue.date.valid}
                    touched={inputValue.date.touched} 
                />
                <button className={classes.Submit}>Оставить заявку</button>
                <p className={classes.Error}>{!isFormValid ? 'Форма заполнена неверно' : null}</p>
            </form>
        ) 
    );
}

export default CallDoctorData;