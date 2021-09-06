import {React} from 'react';
import {Link} from 'react-router-dom';


export default function LandingPage(){
    return (
        <div>
            <h1>Welcome To VideoGame Api</h1>
            <h2> You can Found all the instalation Descriptions and More!!!</h2>
            <Link to = '/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
};

