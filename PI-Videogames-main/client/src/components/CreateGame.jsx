//Instalations
import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//Actions
import { postVideoGame, getGenres } from '../actions/index';

export default function CreateGame() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);

    const history = useHistory();

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        genres: []
    });

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    function validate(form) {
        let errors = {};
        if (!form.name) {
            errors.name = "A Name is Required"
        } if (!form.description) {
            errors.description = "A Description is Required"
        } if (!form.released) {
            errors.released = "A Date of Creation is Required"
        } if (!form.rating) {
            errors.rating = "A Rating Number is Required"
        } if (!form.platforms) {
            errors.platforms = "A Platform is Required"
        }
        return errors;
    };

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }));
        // console.log(form)
    };

    function handleSelect(e) {
        setForm({
            ...form,
            genres: [...form.genres, e.target.value]
        })
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postVideoGame(form));
        alert('Videogame Created');
        setForm({
            name: "",
            image: "",
            description: "",
            released: "",
            rating: "",
            platforms: [],
            genres: []
        });
        history.push(`/home`)
    }

    return (
        <div>
            <Link to='/home' >
                <button>Back</button>
            </Link>
            <h1>Create Your VideoGame</h1>
            <form onSubmit={(e) => handleSubmit(e)} onKeyPress={(e) => { if (e.key === "Enter") {
                 handleSubmit(e)}}}
                autoComplete="off">
                <div>
                    <label>Name:</label>
                    <input type="text" value={form.name} name="name" onChange={(e) => { handleChange(e) }} />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Image:</label>
                    <input type="text" value={form.image} name="image" onChange={(e) => { handleChange(e) }} />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={form.description} name="description" onChange={(e) => { handleChange(e) }} />
                    {errors.description && (
                        <p className="error">{errors.description}</p>
                    )}
                </div>
                <div>
                    <label>Released:</label>
                    <input type="date" value={form.released} name="released" onChange={(e) => { handleChange(e) }} />
                    {errors.released && (
                        <p className="error">{errors.released}</p>
                    )}
                </div>
                <div>
                    <label>Rating:</label>
                    <input type="number" value={form.rating} name="rating" step="0.1" max="5.0" min="0.1" onChange={(e) => { handleChange(e) }} />
                    {errors.rating && (
                        <p className="error">{errors.rating}</p>
                    )}
                </div>
                <div>
                    <label>Platforms:</label>
                    <input type="text" value={form.platforms} name="platforms" onChange={(e) => { handleChange(e) }} />
                    {errors.platforms && (
                        <p className="error">{errors.platforms}</p>
                    )}
                </div>
                <div>
                    <select required onChange={(e) =>
                        handleSelect(e)}>
                        {genres.map((el) => (
                            <option key={el.id} value={el.name}>{el.name}</option>
                        ))}
                    </select>
                <ul>
                        {form.genres.map((el, i) =>
                        <li key={i} >{el}</li>
                        )}
                </ul>
                </div>
                <div>
                    <input type="submit" value="Create" />
                </div>
            </form>
        </div>
    )


}


