import * as Yup from "yup";

import { Button, Label } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { postCreateUser } from '../services/userAPI';

type submitValues = {
  email: string;
  password: string;
  name: string;
}


const Register = () => {
  const navigate = useNavigate();

  const handleSubmitLogin = (values: submitValues) => {
    postCreateUser(values)
      .then(() => {
        navigate("/")
      })
      .catch(err => console.log(err))
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Namn saknas'),
    email: Yup.string()
      .required('Email saknas')
      .email('Ogiltig email'),
    password: Yup.string()
      .required('Lösenord saknas')
  });

  const renderError = (message: string) => <p className="text-red-600 text-start ">{message}</p>;

  return (
    <div>
      <div className="flex items-center justify-center">
        <NavLink to="/" className="mr-5">
          <FaRegArrowAltCircleLeft className="w-10 h-10" />
        </NavLink>
        <h1>Registrera dig!</h1>
      </div>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={handleSubmitLogin}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          values,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 mt-8 ">
            <div>
              <div className="block mb-2 text-white text-start ">
                <Label className="text-white" htmlFor="name" value="Namn" />
              </div>
              <Field
                type="text"
                name="name"
                value={values.name}
                className="w-full text-black rounded-lg input input-solid "
              />
              <ErrorMessage name="name" render={renderError} />
            </div>
            <div>
              <div className="block mb-2 text-white text-start ">
                <Label className="text-white" htmlFor="email" value="E-Post" />
              </div>
              <Field
                type="email"
                name="email"
                value={values.email}
                className="w-full text-black rounded-lg input input-solid "
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
                value={values.password}
                className="w-full text-black rounded-lg input input-solid"
              />
              <ErrorMessage name="password" render={renderError} />
            </div>
            <div className='w-full mt-8'>
              <Button className="w-full" gradientDuoTone="purpleToBlue" type="submit" disabled={isSubmitting}>
                Skapa konto
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Register