import React, {useEffect, useState} from 'react';
import classes from '../styles/PersonalChange.module.css'
import MyThirdButton from '../components/UI/button/MyThirdButton'
import { Link, Navigate } from "react-router-dom";
import logo from '../img/logo.svg';
import Select from 'react-select';
import useAxiosPrivate from '../components/hooks/useAxiosPrivate'
import { useNavigate  } from 'react-router-dom';

const PersonalChange = () => {

    const customStyles = {
        control: (base,state) => ({
          ...base,
          fontFamily: 'Montserrat',
          fontWeight: 'bold',
          boxShadow: '0 0 3px #000',
          border: state.selectedOption ? '#FFBF00 solid 1px' :'white solid 1px',
          color: '#232323',
          height: '50px',
          borderRadius: '0.25rem',
          fontSize: 16,
          margin: '5px 0',
          ':hover': {
            borderColor: '#FFBF00',
        }
        }),
        option: (provided, state) => ({
          ...provided,
          fontSize: 16,
          fontWeight: 'normal',
          color: state.isSelected ? '#232323' : '#232323',
          backgroundColor: state.isSelected ? 'white' : 'white',
          cursor: 'pointer',
          userSelect: 'none',
          '&:hover': {
            color: state.isSelected ? '#232323' : '#232323',
            backgroundColor: state.isSelected ? '#F1F2F4' : '#F1F2F4',
          },
        }),
        
      };


    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [userInfoData, setUserInfoData] = useState(null);
    const navigate = useNavigate();
    const customNoOptionsMessage = () => "Нет вариантов";

    

    function handleSelectChange(option) {
      setSelectedOption(option);

    }

    const options = [
        {value: "MSU", label: "МГУ"},
        {value: "MIREA", label: "РТУ МИРЭА"},
        {value: "MGTU", label: "МГТУ. ИМ БАУМАНА"},
        {value: "MISIS", label: "МИСИС"},
    ]

    const axiosPrivate = useAxiosPrivate();
    const id = localStorage.getItem('user_id')
    const data = {
        description: status,
        address: location,
        education_rating: 100,
        education: selectedOption?.label,
    };
    
    const getInfo = async() => {
      try{
          const response = await axiosPrivate({
          method: 'get',
          url: `/userinfo/?user_id=${id}`,
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
        const response = await getInfo()
        setUserInfoData(response);
      } catch (error) {
        console.error('У вас ошибка:', error);
      }
    };

    fetchData();
  }, []);

    const postInfo = async (data) => {
      
        try {
          const response = await axiosPrivate({
            method: 'post',
            url: `/addUserInfo/?user_id=${id}`,
            data: JSON.stringify(data),   
          });
        }catch(error){
            console.error("У вас ошибка :", error);
        }
      }

      const updateInfo = async (data) => {
      
        try {
          const response = await axiosPrivate({
            method: 'patch',
            url: `/updateuserInfo/?user_id=${id}`,
            data: JSON.stringify(data),   
          });
        }catch(error){
            console.error("У вас ошибка :", error);
        }
      }
    

      

      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          if (userInfoData != null) {
            await updateInfo(data);
          } else {
            await postInfo(data);
          }
          setIsSaved(true);
        } catch (error) {
          console.error('У вас ошибка:', error);
        }
      };

       

      useEffect(() => {
        setIsSaved(false);
      }, [selectedOption, status, location]);
    
      useEffect(() => {
        if (isSaved && userInfoData) {
            navigate('/user/' + userInfoData.user.login);
        }
    }, [isSaved, navigate]);
  

    return (
        <div className={classes.main}>
            <div className={classes.changeContainer}>
            <h1 className={classes.head}>Редактировать профиль</h1>
            <form className={classes.changeForm}>
            <div className={classes.changeUpside}>
                    <Link to="/">
                            <img className={classes.changeLogo} src={logo} alt="Junstudy"/>
                    </Link>
                </div>
                <label className={classes.changeLabel}>Ваше образование</label>
                <Select
                    styles={customStyles} 
                    id="education" 
                    options={options}
                    value={selectedOption}
                    onChange={handleSelectChange}
                    isSearchable
                    isClearable
                    placeholder=""
                    noOptionsMessage= {customNoOptionsMessage}
                >
                </Select>

                <label>Ваш статус</label>
                <textarea  className={classes.changeTextArea} 
                type="text" 
                id="status"
                onChange={(event) => setStatus(event.target.value)}
                ></textarea>

                <label>Ваш город</label>
                <input className={classes.changeInput} 
                autoComplete='off'
                type="text" 
                id="location"
                onChange={(event) => setLocation(event.target.value)} />
                
                    <MyThirdButton 
                      type="submit"
                      onClick={handleSubmit}>Сохранить
                    </MyThirdButton>
                
                
            </form>
            </div>
        </div>
    );
};

export default PersonalChange;