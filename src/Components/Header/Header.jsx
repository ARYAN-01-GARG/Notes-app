import Button from "../Button"
import "../../css/Header.css"

const Header = () => {
  return (
    <header>
        <img src="/images/Logo.png" alt="Logo" loading="lazy" width={200} height={150}/>
        <Button label="Sign In" redirect="/auth" />
    </header>
  )
}

export default Header;