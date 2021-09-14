//Instalations
import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//Actions
import { postVideoGame, getGenres } from '../actions/index';
//Styles
import styles from './styles/CreateGame.module.css';


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
        } else {
            return errors;
        }
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

    function handleDelete(g) {
       
        setForm({
            ...form,
            genres: form.genres.filter(el => el !== g)
        })

    }

    function handleSubmit(e) {
        e.preventDefault();
        if (Object.values(errors).length > 0) {
            alert('Missing Data to Send Form')
        }
        else {
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
            })
            history.push(`/home`)
        }
    }

    const {
        formulary,
        sName,
        sImage,
        sDescr,
        sRel,
        sRat,
        sPlat,
        sGenres,
        submit,
        containerBB,
        backButton } = styles;


    return (
        <div>

            <h1>Create Your VideoGame</h1>

            <form className={formulary} onSubmit={(e) => handleSubmit(e)} onKeyPress={(e) => {
                if (e.key === "Enter") {
                    handleSubmit(e)
                }
            }}
                autoComplete="off">

                <div className={sName} >
                    <input className={errors.name && 'danger'} type="text" placeholder="Name..." value={form.name} name="name" onChange={(e) => { handleChange(e) }} />
                    {errors.name && (
                        <p className={errors.name && 'danger'}>{errors.name}</p>
                    )}
                </div>

                <div className={sImage} >
                    <input type="text" placeholder="Image Url..." value={form.image} name="image" onChange={(e) => { handleChange(e) }} />
                </div>

                <div className={sDescr} >
                    <input className={errors.description && 'danger'} type="text" placeholder="Description..." value={form.description} name="description" onChange={(e) => { handleChange(e) }} />
                    {errors.description && (
                        <p className={errors.description && 'danger'}>{errors.description}</p>
                    )}
                </div>

                <div className={sRel} >
                    <input type="date" placeholder="Released..." value={form.released} name="released" onChange={(e) => { handleChange(e) }} />
                    {errors.released && (
                        <p className={errors.released && 'danger'}>{errors.released}</p>
                    )}
                </div>

                <div ClassName={sRat} >
                    <input className={errors.rating && 'danger'} type="number" placeholder="Rating..." value={form.rating} name="rating" step="0.1" max="5.0" min="0.1" onChange={(e) => { handleChange(e) }} />
                    {errors.rating && (
                        <p className={errors.rating && 'danger'}>{errors.rating}</p>
                    )}
                </div>

                <div className={sPlat}>
                    <input className={errors.platforms && 'danger'} type="text" placeholder="Platforms..." value={form.platforms} name="platforms" onChange={(e) => { handleChange(e) }} />
                    {errors.platforms && (
                        <p className={errors.platforms && 'danger'}>{errors.platforms}</p>
                    )}
                </div>

                <div className={sGenres} >
                    <select onChange={(e) =>
                        handleSelect(e)}>
                        {genres.map((el) => (
                            <option key={el.id} value={el.name}>{el.name}</option>
                        ))}
                    </select>
                    <ul>
                        {form.genres.map((el, i) =>
                            <div>
                                <li key={i + 1}>{el}</li>
                                <button onClick={() => { handleDelete(el.i) }}>X</button>
                            </div>
                        )}
                    </ul>
                </div>

                <div>
                    <input className={submit} type="submit" value="Create" />
                </div>

                <div className={containerBB}>
                    <Link to='/home' >
                        <button className={backButton}>Back</button>
                    </Link>
                </div>

            </form>

        </div>
    )


}


