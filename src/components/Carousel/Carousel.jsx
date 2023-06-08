import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Carousel.css'

function Carousal() {
    return (
        <Carousel  className="carousal-wrapper"
        interval={3000}
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        >
            {/* <div>
                <img src="https://picsum.photos/500/300" />
            </div>
            <div>
                <img src="https://picsum.photos/500/300" />
            </div> */}
            <div>
                <img src="https://www.eatthis.com/wp-content/uploads/sites/4/2020/01/chicken-tikka-masala.jpg" />
            </div>
        </Carousel>
    )
}

export default Carousal