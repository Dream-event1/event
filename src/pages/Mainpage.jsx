"use client";
import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });
  const [visibleImageCounts, setVisibleImageCounts] = React.useState({});
  const [heroImages, setHeroImages] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [adminForm, setAdminForm] = React.useState({
    category: "select one",
    images: [],
  });
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Predefined categories to ensure exactly 6 sections
  const predefinedCategories = [
    {
      category: "welcome_baby",
      title: "Welcome Baby Event",
      description:
        "Celebrate the arrival of your little one with beautiful decorations and memorable moments.",
      icon: "👶",
    },
    {
      category: "haldi_mehendi",
      title: "Haldi Mehendi",
      description:
        "Traditional pre-wedding ceremonies with vibrant colors and joyful celebrations.",
      icon: "🌺",
    },
    {
      category: "bride_groom_entry",
      title: "Bride & Groom Entry Setup",
      description:
        "Grand entrance setups that make your special moment unforgettable.",
      icon: "💒",
    },
    {
      category: "theme_birthday",
      title: "Theme Based Birthday Decoration",
      description:
        "Creative themed birthday parties that bring joy and excitement to your celebration.",
      icon: "🎂",
    },
    {
      category: "anniversary",
      title: "Anniversary Decoration",
      description:
        "Romantic and elegant setups to celebrate your love and milestones.",
      icon: "💕",
    },
    {
      category: "firework",
      title: "Firework Decoration",
      description: "Make your Entry memorable using firework decoration.",
      icon: "🎆",
    },
    {
      category: "flower_decoration",
      title: "Flower Decoration",
      description: "Romantic and elegant setups using flowers.",
      icon: "🌸",
    },
    {
      category: "baby_shower",
      title: "Baby Shower Decoration",
      description:
        "Beautiful and elegant setups to celebrate your love and milestones.",
      icon: "🎈",
    },
    // Add more categories as needed
  ];

  // Fetch images from backend
  React.useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://event-manager-backend-sj89.onrender.com/api/images"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Set hero images
        const heroData = data.find((item) => item.category === "hero");
        setHeroImages(heroData ? heroData.imageUrls : []);

        // Map backend data to predefined categories
        const serviceData = predefinedCategories.map((category) => {
          const backendData = data.find(
            (item) => item.category === category.category
          );
          return {
            ...category,
            imageUrls: backendData ? backendData.imageUrls : [],
          };
        });

        setServices(serviceData);

        // Initialize visible image counts for each service
        setVisibleImageCounts(
          serviceData.reduce(
            (acc, item, index) => ({
              ...acc,
              [index]: Math.min(4, item.imageUrls.length),
            }),
            {}
          )
        );
      } catch (error) {
        console.error("Error fetching images:", error);
        alert("Failed to fetch images from the server.");
      }
    };

    fetchImages();
  }, []);

  // Hero carousel effect
  React.useEffect(() => {
    if (heroImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [heroImages]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, eventType, message } = formData;
    if (!name || !email || !phone || !eventType || !message) {
      alert("Please fill in all fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Compose WhatsApp message
    const text = encodeURIComponent(
      `New Inquiry:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nEvent: ${eventType}\nMessage: ${message}`
    );
    // Open WhatsApp chat with pre-filled message
    window.open(`https://wa.me/7779952130?text=${text}`, "_blank");

    setFormData({ name: "", email: "", phone: "", eventType: "", message: "" });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowMore = (serviceIndex) => {
    setVisibleImageCounts((prev) => {
      const currentCount = prev[serviceIndex] || 4;
      const totalImages = services[serviceIndex].imageUrls.length;
      const newCount = Math.min(currentCount + 4, totalImages);
      return { ...prev, [serviceIndex]: newCount };
    });
  };

  const handleShowLess = (serviceIndex) => {
    setVisibleImageCounts((prev) => {
      const currentCount = prev[serviceIndex] || 4;
      const newCount = Math.max(currentCount - 4, 4);
      return { ...prev, [serviceIndex]: newCount };
    });
  };

  // Admin form handlers
  const handleAdminInputChange = (e) => {
    setAdminForm({ ...adminForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAdminForm({ ...adminForm, images: Array.from(e.target.files) });
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", adminForm.category);
    adminForm.images.forEach((image) => formData.append("images", image));

    try {
      const response = await fetch(
        "https://event-manager-backend-sj89.onrender.com/api/images",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Images uploaded successfully!");
      setAdminForm({ category: "welcome_baby", images: [] });

      // Refresh images
      const updatedImages = await fetch(
        "https://event-manager-backend-sj89.onrender.com/api/images"
      ).then((res) => res.json());
      const heroData = updatedImages.find((item) => item.category === "hero");
      setHeroImages(heroData ? heroData.imageUrls : []);
      const serviceData = predefinedCategories.map((category) => {
        const backendData = updatedImages.find(
          (item) => item.category === category.category
        );
        return {
          ...category,
          imageUrls: backendData ? backendData.imageUrls : [],
        };
      });
      setServices(serviceData);
      setVisibleImageCounts(
        serviceData.reduce(
          (acc, item, index) => ({
            ...acc,
            [index]: Math.min(4, item.imageUrls.length),
          }),
          {}
        )
      );
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images.");
    }
  };

  // Full-size image modal handler
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Handle Explore button click
  const handleExploreClick = (category) => {
    localStorage.setItem("selectedCategory", category);
    navigate("/category");
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close mobile menu when a link is clicked
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <p className="fixed bottom-6 left-2 mb-5 z-22 bg-amber-300 text-black font-semibold mt-160 text-lg px-4 py-2 rounded-full ">
        call us at: <a href="tel:+918319200863" className="text-blue-600 hover:underline">+91 8319200863</a>
        
      </p>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 font-inter">
        {/* Full-size Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="relative max-w-4xl w-full">
              <img
                src={selectedImage}
                alt="Full-size"
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-pink-600">
                  ✨ Dream Event
                </div>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a
                  href="#home"
                  className="text-gray-700 hover:text-pink-600 transition-colors"
                >
                  Home
                </a>
                <a
                  href="#gallery"
                  className="text-gray-700 hover:text-pink-600 transition-colors"
                >
                  Gallery
                </a>
                <a
                  href="#services"
                  className="text-gray-700 hover:text-pink-600 transition-colors"
                >
                  Services
                </a>
                <a
                  href="#offers"
                  className="text-gray-700 hover:text-pink-600 transition-colors"
                >
                  Offers
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-pink-600 transition-colors"
                >
                  Contact
                </a>
              </nav>
              <div className="md:hidden">
                <button onClick={toggleMobileMenu} className="text-gray-700">
                  <i
                    className={
                      isMobileMenuOpen
                        ? "fas fa-times text-xl"
                        : "fas fa-bars text-xl"
                    }
                  ></i>
                </button>
              </div>
            </div>
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden bg-white/90 backdrop-blur-md shadow-lg rounded-b-2xl px-4 py-6">
                <nav className="flex flex-col space-y-4">
                  <a
                    href="#home"
                    className="text-gray-700 hover:text-pink-600 transition-colors text-lg font-semibold"
                    onClick={handleMobileLinkClick}
                  >
                    Home
                  </a>
                  <a
                    href="#gallery"
                    className="text-gray-700 hover:text-pink-600 transition-colors text-lg font-semibold"
                    onClick={handleMobileLinkClick}
                  >
                    Gallery
                  </a>
                  <a
                    href="#services"
                    className="text-gray-700 hover:text-pink-600 transition-colors text-lg font-semibold"
                    onClick={handleMobileLinkClick}
                  >
                    Services
                  </a>
                  <a
                    href="#offers"
                    className="text-gray-700 hover:text-pink-600 transition-colors text-lg font-semibold"
                    onClick={handleMobileLinkClick}
                  >
                    Offers
                  </a>
                  <a
                    href="#contact"
                    className="text-gray-700 hover:text-pink-600 transition-colors text-lg font-semibold"
                    onClick={handleMobileLinkClick}
                  >
                    Contact
                  </a>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section id="home" className="relative h-screen overflow-hidden">
          <div className="absolute inset-0">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image}
                  alt={`Event ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                DREAM EVENT AND BALLOON DECORATION
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Creating magical moments and unforgettable experiences
              </p>
              <a
                href="https://wa.me/8319200863"
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors"
              >
                Plan Your Event
              </a>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Our Gallery
              </h2>
              <p className="text-xl text-gray-600">
                Explore our beautiful work by category
              </p>
            </div>

            <div className="space-y-16">
              {services.map((service, serviceIndex) => (
                <div
                  key={serviceIndex}
                  className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8"
                >
                  <div className="text-center mb-8">
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {service.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {service.imageUrls
                      .slice(0, visibleImageCounts[serviceIndex] || 4)
                      .map((image, index) => (
                        <div
                          key={index}
                          className="relative overflow-hidden rounded-lg group cursor-pointer"
                          onClick={() => handleImageClick(image)}
                        >
                          <img
                            src={image}
                            alt={`${service.title} ${index + 1}`}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                        </div>
                      ))}
                  </div>

                  {(service.imageUrls.length > 4 ||
                    (visibleImageCounts[serviceIndex] || 4) > 4) && (
                    <div className="text-center flex justify-center space-x-4">
                      {service.imageUrls.length >
                        (visibleImageCounts[serviceIndex] || 4) && (
                        <button
                          onClick={() => handleShowMore(serviceIndex)}
                          className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                        >
                          Show More
                        </button>
                      )}
                      {(visibleImageCounts[serviceIndex] || 4) > 4 && (
                        <button
                          onClick={() => handleShowLess(serviceIndex)}
                          className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                        >
                          Show Less
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Our Services
              </h2>
              <p className="text-xl text-gray-600">
                We specialize in creating memorable events for every occasion
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {service.imageUrls.slice(0, 2).map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt={`${service.title} ${imgIndex + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => handleExploreClick(service.category)}
                      className="w-full bg-pink-100 hover:bg-pink-200 text-pink-700 py-2 px-4 rounded-lg font-semibold transition-colors"
                    >
                      Explore More Images
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Offers Section */}
        {/* <section
        id="offers"
        className="py-20 px-4 bg-gradient-to-r from-pink-100 to-purple-100"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Special Offers
            </h2>
            <p className="text-xl text-gray-600">
              Limited time deals for your special events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-pink-600 text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Wedding Package
              </h3>
              <p className="text-gray-600 mb-4">
                Complete wedding planning with 20% off
              </p>
              <div className="text-3xl font-bold text-pink-600 mb-4">
                ₹2,50,000
              </div>
              <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full transition-colors">
                Book Now
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-pink-600 text-4xl mb-4">🎂</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Birthday Special
              </h3>
              <p className="text-gray-600 mb-4">
                Theme birthday decoration with 15% off
              </p>
              <div className="text-3xl font-bold text-pink-600 mb-4">
                ₹25,000
              </div>
              <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full transition-colors">
                Book Now
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-pink-600 text-4xl mb-4">💕</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Anniversary Deal
              </h3>
              <p className="text-gray-600 mb-4">
                Romantic setup with complimentary photography
              </p>
              <div className="text-3xl font-bold text-pink-600 mb-4">
                ₹15,000
              </div>
              <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section> */}




{/* Our works */}


<section id="services-offered" className="py-10 px-4 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-white bg-red-500 p-4 rounded-t-lg">We Deal With</h2>
      <div className="border border-gray-200 p-4 rounded-b-lg">
        <ul className="space-y-2">
          <li className="text-gray-800 font-bold">→ Theme Based Balloon Decoration</li>
          <li className="text-gray-800 font-bold">→ Flower Decoration</li>
          <li className="text-gray-800 font-bold">→ Haldi and Mehendi</li>
          <li className="text-gray-800 font-bold">→ Stage Decoration</li>
          <li className="text-gray-800 font-bold">→ Cold Pyro Entry</li>
          <li className="text-gray-800 font-bold">→ Dry Ice Fog Entry</li>
          <li className="text-gray-800 font-bold">→ Paper Blast Entry</li>
          <li className="text-gray-800 font-bold">→ Balloon Blast Entry</li>
          <li className="text-gray-800 font-bold">→ Bride Groom Entry</li>
          <li className="text-gray-800 font-bold">→ Wedding Firework</li>
        </ul>
      </div>
    </div>
    <div>
      <h2 className="text-2xl font-semibold text-white bg-red-600 p-4 rounded-t-lg">We Are Available For</h2>
      <div className="border border-gray-200 p-4 rounded-b-lg">
        <ul className="space-y-2">
          <li className="text-gray-800 font-bold">→ Birthday</li>
          <li className="text-gray-800 font-bold">→ Ring Ceremony</li>
          <li className="text-gray-800 font-bold">→ Wedding Ceremony</li>
          <li className="text-gray-800 font-bold">→ Naming Ceremony</li>
          <li className="text-gray-800 font-bold">→ Cultural Event</li>
          <li className="text-gray-800 font-bold">→ Get Together</li>
          <li className="text-gray-800 font-bold">→ Anniversary</li>
          <li className="text-gray-800 font-bold">→ School Function</li>
          <li className="text-gray-800 font-bold">→ Pooja/Grih Pravesh</li>
        </ul>
      </div>
    </div>
  </div>
</section>

        {/* Testimonial section */}



        <section id="testimonials" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600">
                Hear from those who’ve celebrated with us
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
              {/* Previous feedback cards */}
              {[
                {
                  name: "Priyansh Sharma",
                  testimonial:
                    "Dream Event made our baby’s welcome party magical! The decorations were perfect, and their team was so professional.",
                  image:
                    "https://th.bing.com/th/id/OIP.nZeXcxr8dxowYfGxoZ99jAHaFd?w=259&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3/150",
                },
                {
                  name: "Rahul Verma",
                  testimonial:
                    "Our wedding entry setup was breathtaking. Dream Event turned our vision into reality with such elegance!",
                  image:
                    "https://th.bing.com/th/id/OIP.hCfHyL8u8XAbreXuaiTMQgHaHZ?w=194&h=193&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3/150",
                },
                {
                  name: "Ankit Desai",
                  testimonial:
                    "The themed birthday party for my daughter was a hit! The kids loved it, and the photos are stunning.",
                  image:
                    "https://th.bing.com/th/id/OIP.jwoZHKQLy5h-DT7a5EYBVQHaJQ?w=164&h=205&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3/150",
                },
                {
                  name: "Suresh Kumar",
                  testimonial:
                    "Dream Event organized our anniversary celebration flawlessly. The flower decorations were beautiful and the service was top-notch.",
                  image:
                    "https://th.bing.com/th/id/OIP.LC5QeewTlOYRlb0-6cg4vAHaNK?w=115&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3/150",
                },
                {
                  name: "Manish Singh",
                  testimonial:
                    "I can’t thank Dream Event enough for the amazing firework decoration at our event. It was truly a night to remember!",
                  image:
                    "https://th.bing.com/th/id/OIP.7jv8nJxT-423383lL9ew8QHaLH?w=129&h=193&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3/150",
                },
              ].map((client, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
                >
                  <img
                    src={client.image}
                    alt={client.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-pink-600"
                  />
                  <p className="text-gray-600 italic mb-4">
                    "{client.testimonial}"
                  </p>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {client.name}
                  </h4>
                </div>
              ))}

    {/* Google Reviews Card */}
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center flex flex-col items-center justify-center">
                <i className="fab fa-google text-5xl text-[#fc3838] mb-4"></i>
                <p className="text-gray-800 font-bold text-lg mb-2">
                  100+ Client Reviews on Google
                </p>
                <a
                  href="https://maps.app.goo.gl/3roLBjgaBZoTKqfZA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  See all reviews on Google
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Contact Us
              </h2>
              <p className="text-xl text-gray-600">
                Let's plan your perfect event together
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Get In Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <i className="fas fa-phone text-pink-600 text-xl w-8"></i>
                    <span className="text-gray-700">+91 8319200863</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-envelope text-pink-600 text-xl w-8"></i>
                    <span className="text-gray-700">
                      satishkhare88@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt text-pink-600 text-xl w-8"></i>
                    <span className="text-gray-700">
                      Supela, Bhilai,Chhattisgarh, India
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="">Select Event Type</option>
                    {services.map((service, index) => (
                      <option key={index} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Admin Section */}
        <section id="admin" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Admin: Upload Images
              </h2>
              <p className="text-xl text-gray-600">
                Add new images to a category
              </p>
            </div>
            <form
              onSubmit={handleAdminSubmit}
              className="max-w-lg mx-auto space-y-6"
            >
              <div>
                <select
                  name="category"
                  value={adminForm.category}
                  onChange={handleAdminInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="hero">Hero Images</option>
                  <option value="welcome_baby">Welcome Baby Event</option>
                  <option value="haldi_mehendi">Haldi Mehendi</option>
                  <option value="bride_groom_entry">
                    Bride & Groom Entry Setup
                  </option>
                  <option value="theme_birthday">
                    Theme Birthday Decoration
                  </option>
                  <option value="anniversary">Anniversary Decoration</option>
                  <option value="firework">Firework Decoration</option>
                  <option value="flower_decoration">Flower Decoration</option>
                  <option value="baby_shower">Baby Shower Decoration</option>
                </select>
              </div>
              <div>
                <input
                  type="file"
                  name="images"
                  onChange={handleFileChange}
                  multiple
                  accept="image/jpeg,image/png"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Upload Images
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">✨ Dream Event</h3>
                <p className="text-gray-300">
                  Creating magical moments and unforgettable experiences for
                  your special occasions.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>Wedding Planning</li>
                  <li>Birthday Parties</li>
                  <li>Welcome baby Event</li>
                  <li>Baby Showers</li>
                  <li>Haldi and mehendi</li>
                  <li>Bride and groom Entry setup</li>
                  <li>Firework decoration</li>
                  <li>Anniversary Celebrations</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <a href="#home" className="hover:text-pink-400">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#gallery" className="hover:text-pink-400">
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-pink-400">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-pink-400">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {/* <a href="#" className="text-gray-300 hover:text-pink-400">
                  <i className="fab fa-facebook text-2xl"></i>
                </a> */}
                  <a
                    href="https://www.instagram.com/dream_events88/"
                    className="text-gray-300 hover:text-pink-400"
                  >
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
              <p>© 2025 Dream Event. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/8319200863"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors z-50"
        >
          <i className="fab fa-whatsapp text-2xl"></i>
        </a>
      </div>
    </>
  );
}

export default MainPage;
