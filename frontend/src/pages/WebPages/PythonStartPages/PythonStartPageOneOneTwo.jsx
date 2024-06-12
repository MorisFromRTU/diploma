import React, {useState, useRef, useEffect} from 'react';
import AceEditor from 'react-ace';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula} from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-vibrant_ink';
import 'ace-builds/src-noconflict/ext-language_tools';
import classes from "../../../styles/WebStyles/PythonStartPage.module.css"
import Navbar from "../../../components/UI/navbar/Navbar";
import ProgressBar from "../../../components/UI/progressBar/ProgressBar";
import {Link} from "react-router-dom";
import useAxiosPrivate from '../../../components/hooks/useAxiosPrivate';
import MyThirdButton from '../../../components/UI/button/MyThirdButton'
const PythonStartPageOneOne = () => {
    const [isHovered, setIsHovered] = useState(false);
    const now = 60; // текущее значение прогресса
    const axiosPrivate = useAxiosPrivate();
    const [taskData, setTaskData] = useState(null);
    const [lessonsData, setLessonsData] = useState(null);
    const [taskNumber, setTaskNumber] = useState(1);
    const [selectedPage, setSelectedPage] = useState(1);
    const [success, setSuccess] = useState('');
    const [code, setCode] = useState('');
    
    const codeStyles = {
        fontSize: '20px', 
        whiteSpace : 'pre-wrap', 
        wordBreak: 'break-word',
        scrollbarWidth: 'thin',
        scrollbarColor: 'white',
      };
    const handleCodeChange = (newCode) => {
        setCode(newCode);
      };

      const executeCode = async (e) => {

        try {
            const response = await axiosPrivate(
                {
                    method: 'post',
                    url: `/lesson/solveTask/?task_id=${taskNumber}`,
                    body: {code}
                }
                
            );
            return response.data;
            
        } catch (error){
            console.error("У вас ошибка :", error);
        }
    };

    const handleSubmitCode = async () => {
        try {
          const response = await executeCode();
          console.log(response)
          setSuccess(response.answer);
        } catch (error) {
          console.error('У вас ошибка:', error);
        }
      };
    


    const getTask = async() => {
        try{
            const response = await axiosPrivate({
            method: 'get',
            url: `/lesson/task/?task_id=${taskNumber}`,
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
            const response = await getTask();
            setTaskData(response.task); 
            setLessonsData(response.task_numbers)
          } catch (error) {
            console.error('У вас ошибка:', error);
          }
        };
    
        fetchData(); 
      }, [taskNumber]);

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
                    key={lesson.task_number}
                    onClick={() => {
                        setSuccess('');
                        setSelectedPage(lesson.task_number);
                        setTaskNumber(lesson.task_number);
                        }
                    }
                    className={selectedPage === lesson.task_number? classes.paginationItemActive : classes.paginationItem}
                    >
                    {lesson.task_number}
                    </Link>
                ))}
                
                </div>
                
                <div className={classes.theoryBlock}>
                        <div className={classes.syntaxBlock}>
                        
                                <div >
                                <pre style={codeStyles}>
                                    {taskData?.text}
                                </pre>
                                    
                                    <br />
                                </div>
                           
                        
                        <AceEditor
                        mode="python"
                        theme="vibrant_ink"
                        name="blah2"
                        onChange={handleCodeChange}
                        fontSize={20}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        style={{width:'100%', marginBottom:'20px'}}
                        setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        }}/>
                        <p style={{marginBottom: '10px', color: 'green', textAlign: 'center'}}>{success}</p>
                        <MyThirdButton onClick={handleSubmitCode}>Отправить</MyThirdButton>
                        
                    </div>
                    
                </div>


                </div>
            </div>
        </>
    );
};

export default PythonStartPageOneOne;