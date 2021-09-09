//instalation
import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux'
//Components
import { getVideoGameNames } from "../actions";

export default function SearchBar() {
    //traigo el dispatch
    const dispatch = useDispatch();
    //Estado local para el name
    const [name, setName] = useState('');

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
            <input type="text" placeholder="Search your game" onChange={(e) => { handleInputChange(e) }} />
            <button type="submit" onClick={(e)=> handleSubmit(e)}>Search</button>
        </div>
    );

};