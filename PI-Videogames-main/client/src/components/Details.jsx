//Instalations
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Actions
import { getDetails } from '../actions/index';
//styles
import styles from './styles/Details.module.css';

export default function Details(props) {
    // console.log(props)
    const dispatch = useDispatch();
    const detailsVideoGame = useSelector((state) => state.details);
    console.log(detailsVideoGame)


    useEffect(() => {
        dispatch(getDetails(props.match.params.id))
    }, [dispatch, props.match.params.id])

    const { loading, backButton, containerBB, gral } = styles;

    return (
        <div>
            {detailsVideoGame.length > 0 ?
                <div className={gral}>
                    <h1>{detailsVideoGame[0].name}</h1>
                    <img src={detailsVideoGame[0].image} alt="" height="400px" width="600px" style={{ borderRadius: "50px" }} />
                    <h3>Released at: {detailsVideoGame[0].released}</h3>
                    <h3>Rating: {detailsVideoGame[0].rating}</h3>
                    <h3>Platforms: {detailsVideoGame[0].createdInDB === true ? detailsVideoGame[0].platforms : "Something went wrong"}</h3>
                    <h3>{!detailsVideoGame[0].createdInDB ?
                        detailsVideoGame[0].genres + ' ' :
                        detailsVideoGame[0].genres.map(el => el.name).join(' - ')}</h3>
                    <h3>{detailsVideoGame[0].createdInDB === true ? detailsVideoGame[0].platforms : (detailsVideoGame[0].description.length > 0 ? detailsVideoGame[0].description.map((el) =>
                        (el.requirements_en) ?
                            el.requirements_en.minimum || el.requirements_en.recommended : '"Description is Empty"') :
                        detailsVideoGame[0].description + '"Description is Empty"')}</h3>
                </div> :
                <div className={loading}>
                    <div></div>
                </div>
            }
            <div className={containerBB}>
                <Link to='/home'>
                    <button className={backButton}>Back</button>
                </Link>
            </div>

        </div>
    )
}