import logo from '../../../assets/logo.svg'

export default function Logo() {
  return (
    <figure className="image">
      <img src={logo.src} alt="OMLG logo" />
      {/* <LogoSvg /> */}
    </figure>
  )
}
