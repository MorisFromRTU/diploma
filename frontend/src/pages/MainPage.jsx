    import Navbar from "../components/UI/navbar/Navbar";
    import classes from '../styles/MainPage.module.css'
    import {useEffect, useState} from "react";

    function MainPage() {

        const [isHovered, setIsHovered] = useState(false);


        const links = [
            { url: '/about', label: 'О нас' },
            { url: '/courses', label: 'Направления' },
            { url: '/forum', label: 'Форум' },
            { url: '/news', label: 'Новости' },
            { url: '/communities', label: 'Сообщества' }
          ];

        return(
        <div className={classes.main}>
            <Navbar links={links} setIsHovered={setIsHovered} />
            <div className={classes.lightBlock}>
                <div className={`${classes.title} ${isHovered
                    ? classes.disabledTitle
                    : classes.title}`}
                >Junstudy</div>

                <div className={`${classes.secondTitle} ${isHovered
                    ? classes.disabledSecondTitle
                    : classes.secondTitle}`}
                >Образовательная IT-платформа</div>

                <div className={classes.infoText}>Начни учить программирование уже сегодня</div>

                <div className={`${classes.light} ${isHovered 
                    ? classes.disabled 
                    : ''}`}
                ></div>

            </div>
        </div>
        )

    }

    export default MainPage;