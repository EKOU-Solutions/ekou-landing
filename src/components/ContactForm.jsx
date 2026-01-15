import { useMemo, useState } from 'react'

const validators = {
  name: (value) => /[A-Za-z0-9 .'-]{3,}/.test(value.trim()),
  email: (value) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim()),
  project: (value) => value.trim().length >= 3,
  message: (value) => value.trim().length >= 10,
}

const ContactForm = ({ labels }) => {
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

  const handleSubmit = (event) => {
    event.preventDefault()
    setTouched({ name: true, email: true, project: true, message: true })
  }

  return (
    <form
      className="relative w-full rounded-2xl border border-(--color-border) bg-transparent backdrop-blur-xs p-6 md:p-8 shadow-[0_10px_20px_rgba(0,0,0,0.20)]"
      onSubmit={handleSubmit}
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
              aria-invalid={getValidationState('name').isInvalid}
              className={`h-10 rounded-xl border bg-(--surface-input)/60 px-4 text-sm text-(--text-primary) outline-none focus:border-(--color-primary) ${getInputClass('name')}`}
            />
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
              aria-invalid={getValidationState('email').isInvalid}
              className={`h-10 rounded-xl border bg-(--surface-input)/60 px-4 text-sm text-(--text-primary) outline-none focus:border-(--color-primary) ${getInputClass('email')}`}
            />
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
            aria-invalid={getValidationState('project').isInvalid}
            className={`h-10 rounded-xl border bg-(--surface-input)/60 px-4 text-sm text-(--text-primary) outline-none focus:border-(--color-primary) ${getInputClass('project')}`}
          />
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
            aria-invalid={getValidationState('message').isInvalid}
            className={`min-h-28 rounded-xl border bg-(--surface-input)/60 px-4 py-3 text-sm text-(--text-primary) outline-none focus:border-(--color-primary) resize-none ${getInputClass('message')}`}
          />
        </label>

        <button
          type="submit"
          className="mt-2 w-full md:w-44 self-center mx-auto rounded-lg bg-(--text-secundary) text-black text-sm font-semibold py-2 hover:opacity-80 transition"
        >
          {labels.submit}
        </button>
      </div>
    </form>
  )
}

export default ContactForm
