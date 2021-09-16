import { React } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/LandingPage.module.css';

export default function LandingPage() {
    const { title, containerButton, subtitle, button } = styles;
    return (
        <div>
            <span className={title}>
                <h1>Welcome To VideoGame Api</h1>
            </span>

            <div className={subtitle} >
                <h2 > You can Found all the instalation Descriptions and More!!!</h2>
            </div>

            <div className={containerButton}>
                <Link to='/home'>
                    <button className={button} >GO</button>
                </Link>
            </div>

        </div>
    )
};

