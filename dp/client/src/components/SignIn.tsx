import React, { useState } from 'react'
import googleIcon from '../assets/Vector (1).svg';
import githubIcon from '../assets/Vector (2).svg';
import vkIcon from '../assets/Vector.svg';
import "../css/signin.scss";
import { useDispatch, useSelector } from 'react-redux';
import { signInThunk, singUpThunk } from '../store/asyncActions/userAssyncActions';

export const SignIn = () => {
    const [formToggle, setFormToggle] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const signUp = (e) => {
        e.preventDefault();
        
        const data = {
            name,
            email,
            password
        };

        dispatch(singUpThunk(data));
    }

    const signIn = (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }

        dispatch(signInThunk(data));
    }

    return (
        <div className='authorization'>
            <div>{user.name}</div>
            <div className="tabs">
                <span className={'sign-in-tab ' + (formToggle ? "active" : "")}
                      onClick={(e) => setFormToggle(true)}>Войти</span>
                <span className={"sign-up-tab " + (formToggle ? "" : "active")}
                      onClick={(e) => setFormToggle(false)}>Зарегистрироваться</span>
            </div>
            <form>
                {formToggle ?
                    <>
                        <input type="text" 
                               className="email-input" 
                               value={email}
                               placeholder='Электронная почта'
                               onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" 
                               className="password-input" 
                               placeholder='Пароль' 
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                        <button className="submit" onClick={(e) => signIn(e)}>
                            Войти
                        </button>
                        <a href="#">Напомнить пароль</a>
                    </>
                    :
                    <>
                        <input type="text" 
                               className="name-input" 
                               placeholder='Имя' 
                               value={name}
                               onChange={(e) => setName(e.target.value)}/>

                        <input type="text"
                               className="email-input"  
                               placeholder='Электронная почта' 
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}/>

                        <input type="text" 
                               className="password-input" 
                               placeholder='Пароль' 
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}/>

                        <div className="accept-privacy">
                            <div className="checkbox-container">
                                <input type="checkbox" 
                                       className="checkbox"
                                       onClick={(e) => setPrivacyChecked(e.target.checked)} />
                            </div>
                            <span className="description">
                                Я соглашаюсь с <a href='#'>условиями использования</a>,
                                <a href='#'>политикой конфиденциальности</a> и
                                разрешаю обрабатывать мои персональные данные
                            </span>
                        </div>
                        <button className="submit" onClick={(e) => signUp(e)}>
                            Зарегистрироваться
                        </button>
                    </>
                }
            </form>
            <div className="socials">
                <span>Или войдите через соц сети</span>
                <div className="icons">
                    <div className="google-icon">
                        <img src={googleIcon} alt="" />
                    </div>

                    <div className="github-icon">
                        <img src={githubIcon} alt="" />
                    </div>

                    <div className="vk-icon">
                        <img src={vkIcon} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
