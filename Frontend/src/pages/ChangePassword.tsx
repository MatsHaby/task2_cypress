import * as Yup from "yup";

import { Button, Label } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { patchChangePassword } from '../services/userAPI';
import { useUserState } from "../hooks/Context";

type submitValues = {
  password: string;
  passwordConfirmation: string;
}


const ChangePassword = () => {
  const navigate = useNavigate();
  const { user } = useUserState()
  const handleSubmitLogin = (values: submitValues) => {
    patchChangePassword({ password: values['password'] }, user?.status === 'success' ? user?.data?.id : '')
      .then(() => {
        navigate("/dashboard")
      })
      .catch(err => console.log(err))
  }

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
  });

  const renderError = (message: string) => <p className="text-red-600 text-start ">{message}</p>;

  return (
    <div>
      <div className="flex items-center justify-center">
        <NavLink to="/dashboard" className="mr-5">
          <FaRegArrowAltCircleLeft className="w-10 h-10" />
        </NavLink>
        <h1>Byta lösenord!</h1>
      </div>
      <Formik
        initialValues={{ passwordConfirmation: '', password: '' }}
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
            <div className="text-start">
              <div className="block mb-2 text-white text-start ">
                <Label className="text-white" htmlFor="password" value="Nytt lösenord" />
              </div>
              <Field
                type="password"
                name="password"
                value={values.password}
                className="w-full text-black rounded-lg input input-solid"
              />
              <ErrorMessage name="password" render={renderError} />
            </div>
            <div className="text-start">
              <div className="block mb-2 text-white text-start ">
                <Label className="text-white" htmlFor="passwordConfirmation" value="Nytt lösenord" />
              </div>
              <Field
                type="password"
                name="passwordConfirmation"
                value={values.passwordConfirmation}
                className="w-full text-black rounded-lg input input-solid"
              />
              <ErrorMessage name="password" render={renderError} />
            </div>
            <div className='w-full mt-6'>
              <Button className="w-full" gradientDuoTone="purpleToBlue" type="submit" disabled={isSubmitting}>
                Byt lösenord
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ChangePassword