import ekouLogo from '../../assets/icons/ekouLogo-v1.svg'

/**
 * @typedef {Object} EkouLogoProps
 * @property {string} [className] - CSS class names
 * @property {string} [alt] - Alt text for the logo image
 * @property {string} [btnAria] - Aria label for the link
 * @property {boolean} [showText] - Whether to show "EKOU" text
 */

/** @type {React.FC<EkouLogoProps>} */
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
