// @ts-nocheck
import {Container, Row, Col, Form as FormInputField} from 'react-bootstrap'
import ContactSuccess from '../Modals/ContactSuccess/ContactSuccess'
import {useState} from 'react'
import * as Yup from 'yup'
import {Formik, Form, Field, ErrorMessage} from 'formik'

const ContactForm = () => {
  const [show, setShow] = useState(false)

  // Yup validation schema
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is Required'),
    email: Yup.string()
      .email('Invalid Email Format')
      .required('Email is Required'),
    subject: Yup.string().required('Subject is Required'),
    message: Yup.string().required('Message is Required'),
  })

  // formik
  const initialValues = {
    fullName: '',
    email: '',
    subject: '',
    message: '',
  }
  const submitContactForm = (values: any, onSubmitProps: any) => {
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    setShow(true)
  }
  return (
    <>
      <div className='contact_form'>
        <Container>
          <Row>
            <Col xl={6} className='m-auto'>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitContactForm}
              >
                {(formik) => {
                  return (
                    <Form>
                      <FormInputField.Group className='mb-3'>
                        <FormInputField.Label>Full Name</FormInputField.Label>
                        <Field
                          type='text'
                          placeholder='John Doe'
                          className='shadow-none form-control'
                          name='fullName'
                        />
                        <ErrorMessage component='span' name='fullName' />
                      </FormInputField.Group>
                      <FormInputField.Group className='mb-3'>
                        <FormInputField.Label>Email</FormInputField.Label>
                        <Field
                          type='email'
                          placeholder='example@gmail.com'
                          className='shadow-none form-control'
                          name='email'
                        />
                        <ErrorMessage component='span' name='email' />
                      </FormInputField.Group>
                      <FormInputField.Group className='mb-3'>
                        <FormInputField.Label>Subject</FormInputField.Label>
                        <Field
                          type='text'
                          placeholder='Subject'
                          className='shadow-none form-control'
                          name='subject'
                        />
                        <ErrorMessage component='span' name='subject' />
                      </FormInputField.Group>
                      <FormInputField.Group className='mb-3'>
                        <FormInputField.Label>Message</FormInputField.Label>
                        <Field
                          as='textarea'
                          rows={3}
                          placeholder='Hey Dude 🖐'
                          className='shadow-none form-control'
                          name='message'
                        />
                        <ErrorMessage component='span' name='message' />
                      </FormInputField.Group>
                      <FormInputField.Group>
                        <button
                          type='submit'
                          disabled={
                            !(formik.dirty && formik.isValid) ||
                            formik.isSubmitting
                          }
                          className={
                            !(formik.dirty && formik.isValid) ||
                            formik.isSubmitting
                              ? 'btn_brand btn_brand_disabled mt-5 mb-3'
                              : 'btn_brand mt-5 mb-3'
                          }
                        >
                          Submit
                        </button>
                      </FormInputField.Group>
                    </Form>
                  )
                }}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
      <ContactSuccess
        type='contact_us'
        show={show}
        handleClose={() => setShow(false)}
      />
    </>
  )
}

export default ContactForm
