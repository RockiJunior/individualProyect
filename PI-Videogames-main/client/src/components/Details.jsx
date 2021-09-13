//Instalations
import React, { useEffect} from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Actions
import { getDetails } from '../actions/index';

export default function Details(props) {
    // console.log(props)
    const dispatch = useDispatch();
    const detailsVideoGame = useSelector((state) => state.details);

    useEffect(() => {
        dispatch(getDetails(props.match.params.id))
    }, [dispatch, props.match.params.id ])

    return (
        <div>
            <Link to='/home'>
                <button>Back</button>
            </Link>
            {
                detailsVideoGame.length > 0 ?
                    <div>
                        <h1>{detailsVideoGame[0].name}</h1>
                        <img src={detailsVideoGame[0].image} alt="" height="400px" width="600px" /> 
                        <h3>Released at:{detailsVideoGame[0].released}</h3>
                        <h3>Rating:{detailsVideoGame[0].rating}</h3>
                        <h3>Platforms {detailsVideoGame[0].platforms.map(el=> el + ' ')}</h3>
                        <h3>{!detailsVideoGame[0].createdInDB?
                            detailsVideoGame[0].genres + ' ' :
                            detailsVideoGame[0].genres.map(el => el.name + ' ') }</h3>
                        <h3>{detailsVideoGame[0].description.length > 0 ? detailsVideoGame[0].description.map(el=> el.requirements_en.minimum || el.requirements_en.recommended):
                        detailsVideoGame[0].description + 'Description is Empty'}</h3>
                    </div> :
                    <div>
                        <h1>Loading...</h1>
                    </div>
            }
            
        </div>
    )
}