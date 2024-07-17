import React, { useContext } from "react"
import InputLabel from "../../components/InputLabel/InputLabel"
import Button from "../../components/Button/Button"
import axios from "axios"
import API_URLS from "../../config/apiUrls"
import { useNavigate } from "react-router-dom"
import { AlertContext } from "../../contexts/AlertContext"
import RequestErrorHandler from "../../services/requestErrorHandler"
import { useForm } from 'react-hook-form';

import "./Login.css"

function Register() {

  const navigate = useNavigate()
  const { showAlert } = useContext(AlertContext)
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    axios
      .post(API_URLS.REGISTER, { email: data.email, password: data.password, name: data.name, phone: data.phone })
      .then((response) => {
        console.log(response.data)
        if (response.data) {
          showAlert("Usuário cadastrado com sucesso!")
          navigate("/home")
        }
      })
      .catch((error) => {
        console.log(error)
        showAlert(RequestErrorHandler(error))
      })
  }

  return (
    <div className="login-container">
      <div className="form-panel">
        <div className="title-container">
          <h1>eShop</h1>
          <h4>Lojas virtuais também podem ser roxas</h4>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h4>Por favor, preencha seu cadastro</h4>
          <div className="grid-register">
            <InputLabel labelValue="Nome" id="name" register={register} validation={{
              required: "Nome é obrigatório",
              minLength: {
                value: 3,
                message: "Digite o mínimo de 3 caracteres"
              }
            }} errors={errors} />

            <InputLabel labelValue="E-mail" id="email" register={register} validation={{
              required: "E-mail é obrigatório",
              minLength: {
                value: 3,
                message: "Digite o mínimo de 3 caracteres"
              }
            }} errors={errors} />

            <InputLabel labelValue="Senha" type="password" id="password" register={register} validation={{
              required: "Senha é obrigatória",
              minLength: {
                value: 3,
                message: "Digite o mínimo de 3 caracteres"
              }
            }} errors={errors} />

            <InputLabel labelValue="Confirmar senha" type="password" id="confirmPassword" register={register} validation={{
              required: "Senha é obrigatória",
              minLength: {
                value: 3,
                message: "Digite o mínimo de 3 caracteres"
              }
            }} errors={errors} />

            <InputLabel labelValue="Telefone" type="number" id="phone" register={register} />


          </div>
          <div className="button-group">
            <a href="" onClick={() => navigate('/login')}>volte para Entrar</a>
            <Button id="btnRegister" value="Cadastrar" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register