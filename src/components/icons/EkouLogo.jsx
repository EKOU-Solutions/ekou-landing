import ekouLogo from '../../assets/icons/ekouLogo-v1.svg'

const EkouLogo = ({ className } = {}) => {
  const image = <img src={ekouLogo.src} alt="logo de ekou" className={className} />

  return (
    <header className="flex items-center">
      {image}
      <h1 className="text-xl font-medium text-(--text-primary)">EKOU</h1>
    </header>
  )
}

export default EkouLogo
