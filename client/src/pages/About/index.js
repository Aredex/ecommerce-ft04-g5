import React from 'react';
import styles from './index.module.scss';

const About = () => {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.title}>--¿Quienes somos?--</div>
                <div><h3 className={styles.frase}>"Cuando un hombre planta árboles en cuya sombra sabe que podrá sentarse, ha comenzado a entender el sentido de la vida..."</h3></div>
                <p><span className = {styles.gardenry}>GARDENRY</span> es una empresa dedicada a la producción de diversas variedades de árboles, arbustos, flores, frutales y palmeras, ofreciendo la mayor variedad y calidad del mercado.</p>
            </div>
            <div>Sobre Nosotros</div>
            <div>
                <img />
            </div>
            <div>
                <img />
            </div>
            <div>
                <img />
            </div>
            <div>
                <img />
            </div>
            <div>
                <img />
            </div>
            <div>
                <img />
            </div>
            <div>
                <img />
            </div>
        </div>
    )
}

export default About;