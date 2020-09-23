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
            <div className={styles.title}>Sobre Nosotros</div>
            <div className = {styles.circle}>
                <img
                src = "https://ca.slack-edge.com/TPRS7H4PN-U016JCYCYD7-cf19a3ffac3f-512"  
                className = {styles.foto}/>
                <div className = {styles.overlay}>
                    <div className={styles.nombre}>Diego Rodriguez</div>
                    </div>
                    <div className = {styles.text}></div>                
            </div>
            <div className = {styles.circle}>
                <img 
                src = "https://ca.slack-edge.com/TPRS7H4PN-U012077NPPA-c2275780353b-512"
                className = {styles.foto} />
                <div className = {styles.overlay}>
                    <div className = {styles.nombre}>Alejo Tabraj</div>
                    </div>
                <div className = {styles.text}></div>                
            </div>
            <div className = {styles.circle}>
                <img 
                src = "https://ca.slack-edge.com/TPRS7H4PN-U016UKDD532-6640c29f5845-512"
                className = {styles.foto}/>
                <div className = {styles.overlay}>
                    <div className = {styles.nombre}>Alexander Cuesta</div>
                    </div>
                <div className = {styles.text}></div>
                
            </div>
            <div className = {styles.circle}>
                <img c
                src = "https://ca.slack-edge.com/TPRS7H4PN-U015QEA5BNK-b2ad8cce2e36-512"
                className = {styles.foto}/>
                <div className = {styles.overlay}>
                    <div className = {styles.nombre}>Ernesto Gonzalez Llano</div>
                    </div>
                <div className = {styles.text}></div>                
            </div>
            <div>
            <div className = {styles.circle2}>
                <img 
                src = "https://ca.slack-edge.com/TPRS7H4PN-U0166511KQB-c5373228c412-512"
                className = {styles.foto}/>
                <div className = {styles.overlay}>
                    <div className = {styles.nombre}>Juan Mercado</div>
                    </div>
                <div className = {styles.text}></div>                
            </div>
            <div className = {styles.circle2}>
                <img 
                src = "https://ca.slack-edge.com/TPRS7H4PN-U016AREF0EQ-47fd10630835-512"
                className = {styles.foto}/>
                <div className = {styles.overlay}>
                   <div className = {styles.nombre}>Maria Sol Battaglia</div>
                    </div>
                <div className = {styles.text}></div>                
            </div>
            <div className = {styles.circle2}>
                <img 
                src = "https://ca.slack-edge.com/TPRS7H4PN-U014ND7NKU0-fdbcaf84952e-512"
                className = {styles.foto}/>
                <div className = {styles.overlay}>
                    <div className = {styles.nombre}>Gisela Capozzi</div>
                    </div>
                <div className = {styles.text}></div>                
            </div>
            </div>
        </div>
    )
}

export default About;