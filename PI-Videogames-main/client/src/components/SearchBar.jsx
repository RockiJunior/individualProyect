//instalation
import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux'
//Components
import { getVideoGameNames } from "../actions";
import styles from './styles/SearchBar.module.css';

export default function SearchBar() {
    //traigo el dispatch
    const dispatch = useDispatch();
    //Estado local para el name
    const [name, setName] = useState('');
    const {searchButton, searchBar} = styles;

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getVideoGameNames(name))
    };

    return (
        <div>
            <input className={searchBar} type="text" placeholder="search game" style={{textAlign: 'center'}}onChange={(e) => { handleInputChange(e) }} />
            <button className={searchButton} type="submit" onClick={(e)=> handleSubmit(e)}>Search</button>
        </div>
    );

};