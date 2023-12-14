import * as Yup from "yup";

import { Button, Label } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import { postLogin } from '../services/userAPI';
import { useState } from "react";
import { useUserState } from "../hooks/Context";

type submitValues = {
  email: string,
  password: string
}

const Login = () => {
  const { setUser } = useUserState();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmitLogin = (values: submitValues) => {
    postLogin(values)
      .then(res => {
        setUser(res)
        navigate("/dashboard")

      })
      .catch(err => setError(err.response.data.data))
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email saknas')
      .email('Ogiltig email'),
    password: Yup.string()
      .required('Lösenord saknas')
  });

  const renderError = (message: string) => <p className="text-red-600 text-start ">{message}</p>;

  return (
    <div>
      <h1>Välkommen!</h1>
      {error && <p data-cy="login-error" className="text-red-600 text-start ">{error}</p>}
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmitLogin}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          values,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit} className="flex gap-4 mt-8 ">
            <div>
              <div className="block mb-2 text-white text-start ">
                <Label className="text-white" htmlFor="email" value="E-Post" />
              </div>
              <Field
                type="email"
                name="email"
                data-cy="email"
                value={values.email}
                className="max-w-full text-black rounded-lg input input-solid "
              />
              <ErrorMessage name="email" render={renderError} />
            </div>
            <div className="text-start">
              <div className="block mb-2 text-white text-start ">
                <Label className="text-white" htmlFor="password" value="Lösenord" />
              </div>
              <Field
                type="password"
                name="password"
                data-cy="password"
                value={values.password}
                className="max-w-full text-black rounded-lg input input-solid"
              />
              <ErrorMessage name="password" render={renderError} />
            </div>
            <div className='mt-8'>
              <Button data-cy="loginSubmit" gradientDuoTone="purpleToBlue" type="submit" >
                Logga in
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="mt-3 text-start"><NavLink data-cy="register" to="/register">Skapa användarkonto här</NavLink></div>
    </div>
  )
}

export default Login