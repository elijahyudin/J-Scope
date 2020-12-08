import React, {useContext, useEffect, useState} from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'


export const AuthPage = () => {
   const auth = useContext(AuthContext)
   const message = useMessage()
   const {loading,request, error, clearError}= useHttp()
   const [form, setForm] = useState( {
       email:'', password: ''
   })

   useEffect (()=>{
    message(error)
    clearError()
   }, [error, message, clearError])
  
  useEffect(()=>{
      window.M.updateTextFields()

  }, [])

   const changeHandler = event => {
      setForm({...form,[event.target.name]: event.target.value})
   }

   const registerHandler = async () => {
       try{
          const data = await request('/api/auth/register', 'POST', {...form})
          console.log('Data', data)
          message(data.message)
       }catch (e){}
    }

    const loginHandler = async () => {
       try{
          const data = await request('/api/auth/login', 'POST', {...form})
          auth.login(data.token, data.userId)
       }catch (e){}
    }
   

    return (
       <div className="row">
         <div className=" col s6 offset-s3">
           <h1>J-Scope - Сократи свою ссылку!</h1>
           <div className="card blue lighten-3">
            <div className="card-content white-text">
             <span className="card-title">Авторизация</span>
               <div> 
                   <div className="input-field">
                     <input 
                       placeholder="Введите email:" 
                       id="email" 
                       type="text"  
                       name="email"
                       className="color-input"
                       value={form.email}
                       onChange={changeHandler}
                       />
                     <label htmlFor="email">Email</label>
                   </div>
                   <form className="input-field">
                     <input 
                       placeholder="Введите пароль:" 
                       id="password" 
                       type="password"  
                       name = "password"
                       className="color-input"
                       value={form.password}
                       onChange={changeHandler}
                       />
                     <label htmlFor="email">Пароль</label>
                   </form>
               </div>
             </div>
            <div className="card-action">
              <button 
               className = "btn blue lighten-1" 
               style={{marginRight:10}}
               onClick={loginHandler} 
               disabled = {loading}
              >
                 Вход
              </button> 
              <button 
               className = "btn blue lighten-2"
               onClick = {registerHandler}
               disabled = {loading}>
                 Регистрация
              </button> 
          </div>
         </div>
         </div>
       </div>
    )
}