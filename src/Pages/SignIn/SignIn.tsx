import { Form, Formik, FormikHelpers } from "formik";
import { signInSchema } from "../../schemas";
import { SignInInitialValues } from "../../types";
import FLoatingPixelsBackground from "../../Shared/FloatingPixelsBackground/FloatingPixelsBackground";
import styles from "./SignIn.module.scss";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { signup } from "../../routes";
import CustomFormField from "../../Shared/CustomFormField/CustomFormField";
import { useLogin } from "../../hooks/useLogin";

const SignIn = () => {
  const { login } = useLogin();
  const initialValues: SignInInitialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (
    user: SignInInitialValues,
    { setSubmitting, resetForm }: FormikHelpers<SignInInitialValues>
  ) => {
    await login(user);
    resetForm();
    setSubmitting(false);
  };

  return (
    <FLoatingPixelsBackground>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={signInSchema}
      >
        {() => (
          <Form>
            <div className={styles.container}>
              <p className={styles.title}>Sign in.</p>

              <div className={styles.fieldsContainer}>
                <CustomFormField
                  name="email"
                  type="text"
                  placeholder="Email"
                  required
                />
                <CustomFormField
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
                <Button
                  block
                  htmlType="submit"
                  size="large"
                  type="primary"
                  className={styles.submitButton}
                >
                  Sign in
                </Button>

                <div className={styles.links}>
                  <span className={styles.alreadyHaveAnAccount}>
                    Don't have an account?
                  </span>
                  &nbsp;
                  <Link className={styles.signInLink} to={signup}>
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </FLoatingPixelsBackground>
  );
};

export default SignIn;
