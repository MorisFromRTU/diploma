import React, {useState, useEffect} from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula, vs, atomDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import classes from "../../../styles/WebStyles/PythonStartPage.module.css"
import Navbar from "../../../components/UI/navbar/Navbar";
import ProgressBar from "../../../components/UI/progressBar/ProgressBar";
import {Link} from "react-router-dom";
import useAxiosPrivate from '../../../components/hooks/useAxiosPrivate'
const PythonStartPageOneOne = () => {
    const [isHovered, setIsHovered] = useState(false);
    const now = 60; // текущее значение прогресса
    const label = `${now}%`;
    const axiosPrivate = useAxiosPrivate();
    const [chapterData, setChapterData] = useState(null);
    const [lessonsData, setLessonsData] = useState(null);
    const [lessonsNumber, setLessonsNumber] = useState(1);
    const [selectedPage, setSelectedPage] = useState('Установка');


    const getChapter = async() => {
        try{
            const response = await axiosPrivate({
            method: 'get',
            url: `/lesson/lesson/?lesson_id=${lessonsNumber}`,
            });
            return response.data;
        }
        catch(error){
            console.error("У вас ошибка :", error);
        }
    }
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getChapter();
            setChapterData(response.modules); 
            setLessonsData(response.lessons)
          } catch (error) {
            console.error('У вас ошибка:', error);
          }
        };
    
        fetchData(); 
      }, [lessonsNumber]);

    const codeStyles = {
        fontSize: '20px', 
      };

    return (
        <>
            <Navbar setIsHovered={setIsHovered}/>

            <div className={classes.main}>
                <div className={classes.themeList}>
                    <div className={classes.themeListHeader}>
                        <p>WEB</p>
                        <p className={classes.themeListHeaderText}>Python. Start</p>
                        <ProgressBar value={0}/>
                    </div>
                    <div>

                        <div className={classes.themeName}>
                            1. Введение
                        </div>
                        <Link to={"/pythonstart/unit=1/1"}>
                            <div className={classes.subThemeName}>
                                1.1 Теория
                            </div>
                        </Link>

                        <Link to={"/pythonstart/unit=1/2"}>
                            <div className={classes.subThemeName}>
                                1.2 Практика
                            </div>
                        </Link>

                    </div>

                    <div>

                        <div className={classes.themeName}>
                            2. Структуры данных
                        </div>
                        <Link to={"/pythonstart/unit=2/1"}>
                            <div className={classes.subThemeName}>
                                2.1 Теория
                            </div>
                        </Link>

                        <Link to={"/pythonstart/unit=2/2"}>
                            <div className={classes.subThemeName}>
                                2.2 Практика
                            </div>
                        </Link>

                    </div>
                    <div>

                        <div className={classes.themeName}>
                            3. Функции
                        </div>
                        <Link to={"/pythonstart/unit=3/1"}>
                            <div className={classes.subThemeName}>
                                3.1 Теория
                            </div>
                        </Link>

                        <Link to={"/pythonstart/unit=3/2"}>
                            <div className={classes.subThemeName}>
                                3.2 Практика
                            </div>
                        </Link>

                    </div>
                    <div>

                        <div className={classes.themeName}>
                            4. ООП
                        </div>
                        <Link to={"/pythonstart/unit=4/1"}>
                            <div className={classes.subThemeName}>
                                4.1 Теория
                            </div>
                        </Link>

                        <Link to={"/pythonstart/unit=4/2"}>
                            <div className={classes.subThemeName}>
                                4.2 Практика
                            </div>
                        </Link>

                    </div>

                </div>
                <div className={classes.contentBlock}>
                <div className={classes.pagination}>
                {lessonsData?.map((lesson) => (
                    <Link
                    key={lesson.id}
                    onClick={() => {
                        setSelectedPage(lesson.title);
                        setLessonsNumber(lesson.lesson_id);
                        }
                    }
                    className={selectedPage === lesson.title ? classes.paginationItemActive : classes.paginationItem}
                    >
                    {lesson.title}
                    </Link>
                ))}
                </div>

                
                <div className={classes.theoryBlock}>
                        <div className={classes.syntaxBlock}>
                        {chapterData &&
                            chapterData.map((item) => {
                                const colonIndex = item.text.indexOf(':');
                                const boldText = item.text.slice(0, colonIndex + 1);
                                const remainingText = item.text.slice(colonIndex + 1);

                                return (
                                <div key={item.id}>
                                    <p>
                                    <span style={{ fontWeight: 'bold' }}>{boldText}</span>
                                    {remainingText}
                                    </p>
                                    {item.code && (
                                    <SyntaxHighlighter language="python" style={darcula} customStyle={codeStyles}>
                                        {item.code}
                                    </SyntaxHighlighter>
                                    
                                    )}
                                    <br />
                                </div>
                                );
                            })}
                        
                         
                        
                    </div>
                    
                </div>


                </div>
            </div>
        </>
    );
};

export default PythonStartPageOneOne;