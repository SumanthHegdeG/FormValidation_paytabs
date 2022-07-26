import React, { useEffect, useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const FormCustome = () => {
  const [validate, setValidate] = useState({ values: {}, errors: {} })
  const [openFields, setOpenFields] = useState(false)

  const fieldsRef = useRef()

  const checkError = (e, state) => {
    var errors = {}

    if (!state.values.templateId) {
      errors.templateId = 'Reqired'
    } else if (/[^A-Za-z0-9]/i.test(state.values.templateId))
      errors.templateId = 'Invalid Template Id '
    else if (state.values.templateId.length < 5)
      errors.templateId = 'Id must have more than 5 characters'
    else if (state.values.templateId.length >= 10)
      errors.templateId = 'Id must have less than 10 characters'

    if (!state.values.templateName) {
      errors.templateName = 'Required'
    } else if (/[^A-Za-z0-9_@./#&+-]/i.test(state.values.templateName)) {
      errors.templateName = 'Invalid Template Name '
    } else if (state.values.templateName.length < 10)
      errors.templateName = 'Id must have more than 10 characters'
    else if (state.values.templateName.length >= 20)
      errors.templateName = 'Id must have less than 20 characters'

    if (!state.values.message) {
      errors.message = 'Required'
    } else if (/[^A-Za-z0-9]/i.test(state.values.message)) {
      errors.message = 'Invalid Message'
    } else if (state.values.message.length < 10)
      errors.message = 'Id must have more than 10 characters'
    else if (state.values.message.length >= 20)
      errors.message = 'Id must have less than 10 characters'

    if (!state.values.messageType) {
      errors.messageType = 'Required'
    }

    if (!state.values.messageFormat) {
      errors.messageFormat = 'Required'
    }

    if (!state.values.messageHeaderFormat) {
      errors.messageHeaderFormat = 'Required'
    }

    if (!state.values.messageField) {
      errors.messageField = 'Required'
    }

    if (
      state.values.messageType &&
      state.values.messageType === '0200' &&
      !state.values.isDecline
    ) {
      errors.isDecline = 'Required'
    }

    if (
      state.values.messageType &&
      state.values.messageType === '0400' &&
      !state.values.orgShouldPresent
    ) {
      errors.orgShouldPresent = 'Required'
    }
    if (
      state.values.messageType &&
      state.values.messageType === '0500' &&
      !state.values.batchNo
    ) {
      errors.batchNo = 'Required'
    }

    try {
      return errors[e.target.name]
    } catch {
      return errors
    }
  }

  const handleChange = (e) => {
    var error = undefined
    setValidate((state) => {
      const newState = {
        ...state,
        values: {
          ...state.values,
          [e.target.name]: e.target.value,
        },
      }
      console.log(newState)
      error = checkError(e, newState)
      return { ...newState }
    })

    setValidate((state) => {
      if (state.values.messageType && state.values.messageType !== '0200') {
        delete state.errors.isDecline
      }
      return {
        ...state,
        errors: {
          ...state.errors,
          [e.target.name]: error,
        },
      }
    })
  }

  const handleCheck = (e) => {
    var messageField = validate.values.messageField
      ? validate.values.messageField.split(', ')
      : ''
    if (e.target.checked) {
      messageField = [...messageField, e.target.value]
    } else
      messageField = messageField.filter((field) => field !== e.target.value)

    setValidate((state) => {
      return {
        ...state,
        values: {
          ...state.values,
          messageField: messageField.join(', '),
        },
      }
    })
  }

  useEffect(() => {
    const closeFields = (e) => {
      if (fieldsRef.current && !fieldsRef.current.contains(e.target)) {
        setOpenFields(false)
      }
    }

    document.body.addEventListener('click', closeFields)
    return () => document.body.removeEventListener('click', closeFields)
  }, [])

  const messageType = ['0100', '0200', '0400', '0500', '0800']

  const messageFormat = ['JSON', 'ISO']

  const messageHeaderFormat = ['0BN', '2BN']

  const submit = (e) => {
    e.preventDefault()
    const errors = checkError(null, validate)
    console.log(Object.keys(errors).length)
    console.log(errors)
    if (Object.keys(errors).length)
      setValidate((state) => ({ ...state, errors: { ...errors } }))
    else console.log(validate.values)
  }
  return (
    <div>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Template Id</Form.Label>
          <Form.Control
            className={validate.errors.templateId && ' is-invalid'}
            type='text'
            name='templateId'
            onChange={handleChange}
            onBlur={handleChange}
            placeholder={'Template Id'}
            value={validate.values.templateId || ''}
          />
          {validate.errors.templateId && (
            <div className='invalid-feedback'>{validate.errors.templateId}</div>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Template Name</Form.Label>
          <Form.Control
            className={validate.errors.templateName && ' is-invalid'}
            type='text'
            name='templateName'
            placeholder='Template Name'
            onChange={handleChange}
            onBlur={handleChange}
            value={validate.values.templateName || ''}
          />
          {validate.errors.templateName && (
            <div className='invalid-feedback'>
              {validate.errors.templateName}
            </div>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Message</Form.Label>
          <Form.Control
            className={validate.errors.message && ' is-invalid'}
            type='text'
            name='message'
            onChange={handleChange}
            onBlur={handleChange}
            placeholder={'Message'}
            value={validate.values.message || ''}
          />
          {validate.errors.message && (
            <div className='invalid-feedback'>{validate.errors.message}</div>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Message Type</Form.Label>
          <Form.Select
            className={validate.errors.messageType && ' is-invalid'}
            type='text'
            name='messageType'
            onChange={handleChange}
            onBlur={handleChange}
          >
            <option value={''}>Select message Type</option>
            {messageType.map((type, index) => (
              <option value={type} key={`m-${index}`}>
                {type}
              </option>
            ))}
          </Form.Select>

          {validate.errors.messageType && (
            <div className='invalid-feedback'>
              {validate.errors.messageType}
            </div>
          )}
        </Form.Group>

        {validate.values.messageType && (
          <>
            <Form.Group className='mb-3'>
              <Form.Label>Message Format</Form.Label>
              <Form.Select
                className={validate.errors.messageFormat && ' is-invalid'}
                type='text'
                name='messageFormat'
                onChange={handleChange}
                onBlur={handleChange}
              >
                <option value={''}>Select Format</option>
                {messageFormat.map((format, index) => (
                  <option value={format} key={`f-${index}`}>
                    {format}
                  </option>
                ))}
              </Form.Select>

              {validate.errors.messageFormat && (
                <div className='invalid-feedback'>
                  {validate.errors.messageFormat}
                </div>
              )}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Message Header Format</Form.Label>
              <Form.Select
                className={validate.errors.messageHeaderFormat && ' is-invalid'}
                type='text'
                name='messageHeaderFormat'
                onChange={handleChange}
                onBlur={handleChange}
              >
                <option value={''}>Select Header Format</option>
                {messageHeaderFormat.map((HeaderFormat, index) => (
                  <option value={HeaderFormat} key={`hf-${index}`}>
                    {HeaderFormat}
                  </option>
                ))}
              </Form.Select>

              {validate.errors.messageHeaderFormat && (
                <div className='invalid-feedback'>
                  {validate.errors.messageHeaderFormat}
                </div>
              )}
            </Form.Group>
            <div className='mb-3'>
              <Form.Label>Message Fields</Form.Label>
              <div ref={fieldsRef}>
                <div
                  className={`w-100 border rounded-3 position-relative ${
                    validate.errors.messageField && 'border-danger'
                  } `}
                >
                  <div
                    onClick={() => setOpenFields(!openFields)}
                    onBlur={checkError}
                  >
                    <p
                      className='text-muted p-2 m-0'
                      style={{ cursor: 'pointer' }}
                    >
                      {validate.values.messageField
                        ? validate.values.messageField
                        : 'Click to expand'}
                    </p>
                  </div>
                  {openFields && (
                    <div
                      className='position-absolute border w-100 px-2  bg-white shadow'
                      style={{ maxHeight: '120px', overflowY: 'auto' }}
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(
                        (element) => (
                          <div key={`f-${element}`}>
                            <Form.Check
                              onClick={handleCheck}
                              type={'checkbox'}
                              id={`${element}`}
                              label={` ${element}`}
                              value={` ${element}`}
                            />
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
              {validate.errors.messageField && (
                <div className='text-danger small'>
                  {validate.errors.messageField}
                </div>
              )}
            </div>
          </>
        )}
        {validate.values.messageType === '0200' && (
          <Form.Group className='mb-3'>
            <Form.Select
              className={validate.errors.isDecline && ' is-invalid'}
              type='text'
              name='isDecline'
              onChange={handleChange}
              onBlur={handleChange}
            >
              <option>is Declined</option>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </Form.Select>
            <div className='invalid-feedback'>
              {validate.errors.isDecline && (
                <div className='invalid-feedback'>
                  {validate.errors.isDecline}
                </div>
              )}
            </div>
          </Form.Group>
        )}

        {validate.values.messageType === '0400' && (
          <Form.Group className='mb-3'>
            <Form.Select
              className={validate.errors.orgShouldPresent && ' is-invalid'}
              type='text'
              name='orgShouldPresent'
              onChange={handleChange}
              onBlur={handleChange}
            >
              <option>orgShould Present </option>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </Form.Select>
            <div className='invalid-feedback'>
              {validate.errors.orgShouldPresent && (
                <div className='invalid-feedback'>
                  {validate.errors.orgShouldPresent}
                </div>
              )}
            </div>
          </Form.Group>
        )}

        {validate.values.messageType === '0500' && (
          <Form.Group className='mb-3'>
            <Form.Label>Batch No</Form.Label>
            <Form.Control
              min={100}
              max={99999}
              className={validate.errors.batchNo && ' is-invalid'}
              type='Number'
              name='batchNo'
              onChange={handleChange}
              onBlur={handleChange}
              value={validate.values.batchNo || ''}
            />
            {validate.errors.batchNo && (
              <div className='invalid-feedback'>{validate.errors.batchNo}</div>
            )}
          </Form.Group>
        )}
        <Button type='submit' onClick={submit}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default FormCustome
