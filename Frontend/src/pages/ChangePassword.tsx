import * as Yup from "yup";

import { Button, Label } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { patchChangePassword } from '../services/userAPI';
import { useUserState } from "../hooks/Context";

type submitValues = {
  password: string;
  retypePassword: string;
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
    password: Yup
      .string()
      .required('Ange lösenord'),
    retypePassword: Yup
      .string()
      .required('Ange lösenordet igen')
      .oneOf([Yup.ref('password')], 'Lösenorden matchar inte')
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
        initialValues={{ retypePassword: '', password: '' }}
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
                data-cy="changePasswordInput"
                value={values.password}
                className="w-full text-black rounded-lg input input-solid"
              />
              <ErrorMessage name="password" render={renderError} />
            </div>
            <div className="text-start">
              <div className="block mb-2 text-white text-start ">
                <Label className="text-white" htmlFor="retypePassword" value="Bekräfta lösenord" />
              </div>
              <Field
                type="password"
                name="retypePassword"
                data-cy="changePasswordAgainInput"
                value={values.retypePassword}
                className="w-full text-black rounded-lg input input-solid"
              />
              <ErrorMessage name="retypePassword" render={renderError} />
            </div>
            <div className='w-full mt-6'>
              <Button data-cy="changePasswordSubmit" className="w-full" gradientDuoTone="purpleToBlue" type="submit" disabled={isSubmitting}>
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