//Instalations
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Actions
import { getDetails, deleteVideoGameDB} from '../actions/index';
//styles
import styles from './styles/Details.module.css';

export default function Details(props) {
    // console.log(props)
    const dispatch = useDispatch();
    const detailsVideoGame = useSelector((state) => state.details);

    const [detail, setDetail] = useState([]);
    const history = useHistory();

    useEffect(() => {
        dispatch(getDetails(props.match.params.id));
    }, [dispatch, props.match.params.id])

    function handleDetail(e) {
        e.preventDefault();
        setDetail(getDetails(detail));
        history.push(`/home`)
    }

    function handleDelete() {
        dispatch(deleteVideoGameDB(props.match.params.id));
        // dispatch(getVideoGames());
        // dispatch(getGenres());
        history.push(`/home`);
        window.location.replace('');
    }


    const { loading, backButton, containerBB, gral, containerDelete, deleteButton } = styles;

    return (
        <div>
            {detailsVideoGame.length > 0 ?
                <div className={gral}>
                    <h1>{detailsVideoGame[0].name}</h1>
                    <img src={detailsVideoGame[0].image} alt="" height="400px" width="600px" style={{ borderRadius: "50px" }} />
                    <h3>Released at: {detailsVideoGame[0].released}</h3>
                    <h3>Rating: {detailsVideoGame[0].rating}</h3>
                    <h3>Platforms: {detailsVideoGame[0].createdInDB === true ? detailsVideoGame[0].platforms : detailsVideoGame[0].platforms.map(el => el)}</h3>
                    <h3>Genres: {!detailsVideoGame[0].createdInDB ?
                        detailsVideoGame[0].genres + ' ' :
                        detailsVideoGame[0].genres.map(el => el.name).join(' - ')}</h3>
                    <label style={{ fontWeight: "bold", fontSize: "20px", margin: "0", padding: "0" }}>---Description---</label>
                    <h3>{detailsVideoGame[0].description}</h3>
                </div> :
                <div className={loading}>
                    <div></div>
                </div>
            }
            <div className={containerBB}>
                <button className={backButton} onClick={(e) => handleDetail(e)}>Back</button>
            </div>

            <div className={containerDelete}>
                <button className={deleteButton} onClick={(e) => {
                    const confirmBox = window.confirm('Do you really want to delete this Game?');
                    if (confirmBox === true) {
                        handleDelete(e)
                    }
                }}>X</button>
            </div>

        </div>
    )
}