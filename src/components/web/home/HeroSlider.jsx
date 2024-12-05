import { useState, useEffect } from "react";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Api from "../../../services/Api";
import Loading from "../../general/Loading";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const HeroSlider = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define heading & subheading
  const headingContent = "Selamat Datang di SiturajaApp👋";
  const subHeadingContent =
    "Memberikan pelayanan informasi dan transparansi untuk masyarakat desa Situraja";

  const fetchDataSliders = async () => {
    setLoading(true);
    try {
      const response = await Api.get("/api/public/sliders");
      setSliders(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sliders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSliders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="hero-wrapper">
      <div className="container">
        <div className="pt-3">
          <Swiper
            loop={true}
            pagination={true}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="hero-slides"
          >
            {sliders.map((slider) => (
              <SwiperSlide
                key={slider.id}
                className="single-hero-slide"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slider.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="slide-content h-100 d-flex align-items-center">
                  <div className="slide-text px-4">
                    <h2
                      className="text-white mb-3 fw-bold"
                      style={{
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                        fontSize: "1.6rem",
                      }}
                    >
                      {headingContent}
                    </h2>
                    <h5
                      className="text-white mb-4"
                      style={{
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                        fontWeight: "400",
                        fontSize: "1rem",
                        maxWidth: "700px",
                        lineHeight: "1.2",
                      }}
                    >
                      {subHeadingContent}
                    </h5>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
