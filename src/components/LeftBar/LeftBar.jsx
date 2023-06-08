import { Link } from 'react-router-dom';
import './LeftBar.css'

function LeftBar() {
  return (
    <div className="homepage-leftBar">
      <div className="leftTop">
        <div>
          <h3>Recipe<span>{` `}App</span></h3>
          <p>Healty meals, healthy life.</p>
        </div>
        <h4>Welcome!</h4>
      </div>
      <div className="leftBottom">
        <div className="menu">
          <div className="menuTop">
            <h3>MENU</h3>
            <Link to={"/"}>
              <div className="menuItems">Discover Recipes</div></Link>
            {/* <div className="menuItems">My Recipes</div> */}
            <Link to={"/recently-viewed"}>
              <div className="menuItems">Recently Viewed Recipes</div>
            </Link>
          </div>
          <div className="menuBottom">
            <h3>YOUR ACCOUNT</h3>
            <div className="menuItems blur">Account</div>
            <div className="menuItems blur">Help & Support</div>
            <div className="menuItems blur">Log Out</div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftBar;