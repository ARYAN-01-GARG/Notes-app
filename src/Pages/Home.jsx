import Button from "../Components/Button";
import '../css/Home.css'

function Home() {
  return (
    <div className="home">
        <div className="home_content">
            <h1>Create and Manage notes with Note-Lee.</h1>
            <h3>Note-lee helps you to create your notes and mange them efficiently.</h3>
            <Button label="Go To Notes" redirectURL="/notes" />
        </div>
    </div>
  )
}

export default Home;