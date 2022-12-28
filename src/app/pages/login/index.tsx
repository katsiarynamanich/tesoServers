import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cx from 'classnames';
import { Button, CircularProgress } from '@mui/material';

import { axiosClient } from 'app/shared/api/axiosClient';
import AllRoutes from 'app/shared/config/routes';
import { ACCESS_TOKEN } from 'app/shared/config/constants';

import styles from './styles.module.scss';

export default function Login(): ReactElement {
  const navigate = useNavigate();
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const tsAccessToken = localStorage.getItem(ACCESS_TOKEN);

  const getTokenByLoginUser: any = (values) => {
    setIsLoadingLogin(true);
    axiosClient
      .post('/tokens', {
        username: values.name,
        password: values.password,
      })
      .then(
        (result) => {
          localStorage.setItem(ACCESS_TOKEN, result.data.token);
          navigate(AllRoutes.MAIN);
          setIsLoadingLogin(false);
        },
        (error) => {
          setIsLoadingLogin(false);
          toast.error(error?.response?.data?.message || 'Not found');
        }
      )
      .catch((error) => {
        setIsLoadingLogin(false);
        toast.error(error?.response?.data?.message || 'Not found');
      });
  };

  useEffect(() => {
    tsAccessToken && navigate(AllRoutes.MAIN);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('User name is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      getTokenByLoginUser(values);
    },
  });
  return (
    <div className={styles.login__wrapper}>
      {!tsAccessToken && (
        <div className={styles.login__form_wrapper}>
          <form onSubmit={formik.handleSubmit} className={styles.login__form}>
            <label htmlFor="name" className={styles.login__form_label}>
              User name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Input user name"
              className={styles.login__form_input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name && (
              <div className={styles.login__form_error}>{formik.errors.name}</div>
            )}
            <label
              htmlFor="password"
              className={cx(styles.login__form_label, styles.login__form_password)}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Input password"
              className={styles.login__form_input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <div className={styles.login__form_error}>{formik.errors.password}</div>
            )}
            <Button
              variant="contained"
              className={
                Object.keys(formik.errors).length > 0 || !formik.values.name || isLoadingLogin
                  ? cx(styles.login__form_button, styles.login__form_buttonDisabled)
                  : styles.login__form_button
              }
              disabled={
                Object.keys(formik.errors).length > 0 || !formik.values.name || isLoadingLogin
              }
              onClick={() => formik.handleSubmit()}
            >
              {isLoadingLogin && <CircularProgress size={18} />}
              {!isLoadingLogin && 'Login'}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
