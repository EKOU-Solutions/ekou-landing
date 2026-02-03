import ekouLogo from '../../assets/icons/ekouLogo-v1.svg'

const EkouLogo = ({ className, alt, btnAria, showText = true } = {}) => {
  const image = <img src={ekouLogo.src} alt={alt} className={className} />

  return (
    <a href="#main" className="flex items-center" aria-label={btnAria}>
      {image}
      {showText ? (
        <span className="text-xl font-medium text-(--text-primary)" aria-hidden="true">
          EKOU
        </span>
      ) : null}
    </a>
  )
}

export default EkouLogo
