import { useMemo, useState } from 'react'

const validators = {
  name: (value) => /[A-Za-z0-9 .'-]{3,}/.test(value.trim()),
  email: (value) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim()),
  project: (value) => value.trim().length >= 3,
  message: (value) => value.trim().length >= 10,
}

const ContactForm = ({ labels, endpoint }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  })
  // Marca si cada campo ya fue tocado (onBlur).
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    project: false,
    message: false,
  })
  const [status, setStatus] = useState('idle')

  // Calcula errores por campo segun los valores actuales.
  const errors = useMemo(() => {
    return {
      name: !validators.name(values.name),
      email: !validators.email(values.email),
      project: !validators.project(values.project),
      message: !validators.message(values.message),
    }
  }, [values])

  const setFieldValue = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (status !== 'idle' && status !== 'submitting') {
      setStatus('idle')
    }
  }

  const setFieldTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  // Devuelve el estado visual solo despues de tocar el campo.
  const getValidationState = (field) => {
    const isTouched = touched[field]
    const hasError = errors[field]
    return {
      isTouched,
      isValid: isTouched ? !hasError : false,
      isInvalid: isTouched ? hasError : false,
    }
  }

  const getLabelClass = (field) => {
    const { isValid, isInvalid } = getValidationState(field)
    if (isValid) return 'text-(--color-primary)'
    if (isInvalid) return 'text-red-400'
    return 'text-(--text-secundary)'
  }

  const getInputClass = (field) => {
    const { isValid, isInvalid } = getValidationState(field)
    if (isValid) return 'border-(--color-primary)'
    if (isInvalid) return 'border-red-400'
    return 'border-(--color-border)'
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'submitting') {
      return
    }
    setTouched({ name: true, email: true, project: true, message: true })
    if (Object.values(errors).some(Boolean)) {
      return
    }
    if (!endpoint) {
      setStatus('error')
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    setStatus('submitting')

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      if (response.ok) {
        setStatus('success')
        setValues({ name: '', email: '', project: '', message: '' })
        setTouched({ name: false, email: false, project: false, message: false })
        return
      }

      setStatus('error')
    } catch (error) {
      setStatus('error')
    }
  }

  const isSubmitting = status === 'submitting'
  const statusMessage =
    status === 'submitting'
      ? labels.loadingMessage
      : status === 'success'
        ? labels.successMessage
        : status === 'error'
          ? labels.errorMessage
          : ''
  const statusClass =
    status === 'success'
      ? 'text-(--color-primary)'
      : status === 'error'
        ? 'text-red-400'
        : 'text-(--text-secundary)'
  const statusRole = status === 'error' ? 'alert' : 'status'
  const errorMessages = {
    name: labels.nameError,
    email: labels.emailError,
    project: labels.projectError,
    message: labels.messageError,
  }
  const nameValidation = getValidationState('name')
  const emailValidation = getValidationState('email')
  const projectValidation = getValidationState('project')
  const messageValidation = getValidationState('message')

  return (
    <form
      className="relative w-full rounded-2xl border border-(--color-border) bg-transparent backdrop-blur-xs p-6 md:p-8 shadow-[0_10px_20px_rgba(0,0,0,0.20)]"
      action={endpoint || undefined}
      method="POST"
      onSubmit={handleSubmit}
      aria-label={labels.formAriaLabel}
      noValidate
    >
      <div
        className="absolute inset-0 rounded-2xl shadow-[inset_0_0_18px_rgba(255,255,255,0.12)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className={`text-xs flex flex-col gap-2 ${getLabelClass('name')}`}>
            {labels.nameLabel}
            <input
              type="text"
              name="name"
              placeholder={labels.namePlaceholder}
              value={values.name}
              onChange={(event) => setFieldValue('name', event.target.value)}
              onBlur={() => setFieldTouched('name')}
              aria-invalid={nameValidation.isInvalid}
              aria-describedby={nameValidation.isInvalid ? 'name-error' : undefined}
              disabled={isSubmitting}
              className={`h-10 rounded-xl border bg-(--surface-input)/60 px-4 text-sm text-(--text-primary) outline-none focus:border-(--color-primary) ${getInputClass('name')}`}
            />
            {nameValidation.isInvalid ? (
              <p id="name-error" className="text-[11px] text-red-400" role="alert">
                {errorMessages.name}
              </p>
            ) : null}
          </label>
          <label className={`text-xs flex flex-col gap-2 ${getLabelClass('email')}`}>
            {labels.emailLabel}
            <input
              type="email"
              name="email"
              placeholder={labels.emailPlaceholder}
              value={values.email}
              onChange={(event) => setFieldValue('email', event.target.value)}
              onBlur={() => setFieldTouched('email')}
              aria-invalid={emailValidation.isInvalid}
              aria-describedby={emailValidation.isInvalid ? 'email-error' : undefined}
              disabled={isSubmitting}
              className={`h-10 rounded-xl border bg-(--surface-input)/60 px-4 text-sm text-(--text-primary) outline-none focus:border-(--color-primary) ${getInputClass('email')}`}
            />
            {emailValidation.isInvalid ? (
              <p id="email-error" className="text-[11px] text-red-400" role="alert">
                {errorMessages.email}
              </p>
            ) : null}
          </label>
        </div>

        <label className={`text-xs flex flex-col gap-2 ${getLabelClass('project')}`}>
          {labels.projectLabel}
          <input
            type="text"
            name="project"
            placeholder={labels.projectPlaceholder}
            value={values.project}
            onChange={(event) => setFieldValue('project', event.target.value)}
            onBlur={() => setFieldTouched('project')}
            aria-invalid={projectValidation.isInvalid}
            aria-describedby={projectValidation.isInvalid ? 'project-error' : undefined}
            disabled={isSubmitting}
            className={`h-10 rounded-xl border bg-(--surface-input)/60 px-4 text-sm text-(--text-primary) outline-none focus:border-(--color-primary) ${getInputClass('project')}`}
          />
          {projectValidation.isInvalid ? (
            <p id="project-error" className="text-[11px] text-red-400" role="alert">
              {errorMessages.project}
            </p>
          ) : null}
        </label>

        <label className={`text-xs flex flex-col gap-2 ${getLabelClass('message')}`}>
          {labels.messageLabel}
          <textarea
            name="message"
            rows="4"
            placeholder={labels.messagePlaceholder}
            value={values.message}
            onChange={(event) => setFieldValue('message', event.target.value)}
            onBlur={() => setFieldTouched('message')}
            aria-invalid={messageValidation.isInvalid}
            aria-describedby={messageValidation.isInvalid ? 'message-error' : undefined}
            disabled={isSubmitting}
            className={`min-h-28 rounded-xl border bg-(--surface-input)/60 px-4 py-3 text-sm text-(--text-primary) outline-none focus:border-(--color-primary) resize-none ${getInputClass('message')}`}
          />
          {messageValidation.isInvalid ? (
            <p id="message-error" className="text-[11px] text-red-400" role="alert">
              {errorMessages.message}
            </p>
          ) : null}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full md:w-44 self-center mx-auto rounded-lg bg-[#b3bdd2] text-black text-sm font-semibold py-2 hover:opacity-80 transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:opacity-60"
        >
          {labels.submit}
        </button>
        {statusMessage ? (
          <p className={`text-xs text-center ${statusClass}`} role={statusRole} aria-live="polite">
            {statusMessage}
          </p>
        ) : null}
      </div>
    </form>
  )
}

export default ContactForm
