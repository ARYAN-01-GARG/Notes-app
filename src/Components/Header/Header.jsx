import Button from "../Button"
import "../../css/Header.css"

const Header = () => {
  return (
    <header>
        <h1 className="logo">
            Notes-Lee
        </h1>
        <Button label="Register" redirectURL="/register" />
    </header>
  )
}

export default Header;