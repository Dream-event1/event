"use client";
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import categoryData from "./category";

function CategoryPage() {
//   const router = useRouter();
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch category and images
  useEffect(() => {
    const category = localStorage.getItem("SelectedCategory");
    console.log(category);
    if (!category) {
      setError("No category selected");
      setLoading(false);
      return;
    }

    const info = categoryData.find((cat) => cat.category === category);
    if (!info) {
      setError("Invalid category");
      setLoading(false);
      return;
    }
    setCategoryInfo(info);

    const fetchImages = async () => {
      try {
        const response = await fetch("https://event-manager-backend-sj89.onrender.com/api/images");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const categoryData = data.find((item) => item.category === category);
        setImages(categoryData ? categoryData.imageUrls : []);
      } catch (err) {
        setError("Failed to fetch images");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Handle image click for full-size modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
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


      {/* Category Content */}
      <section className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {categoryInfo.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {categoryInfo.description}
            </p>
          </div>

          {/* Quotes */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Inspiring Moments
            </h2>
            <div className="space-y-4">
              {categoryInfo.quotes.map((quote, index) => (
                <p
                  key={index}
                  className="text-lg text-gray-600 italic text-center"
                >
                  "{quote}"
                </p>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Gallery
            </h2>
            {images.length === 0 ? (
              <p className="text-center text-gray-600">
                No images available for this category.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg group cursor-pointer"
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image}
                      alt={`${categoryInfo.title} ${index + 1}`}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            <a
              href="tel:+918319200863"
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Contact Us
            </a>
            <a
              href="https://wa.me/8319200863"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center"
            >
              <i className="fab fa-whatsapp mr-2"></i> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">✨ V3 Events</h3>
              <p className="text-gray-300">
                Creating magical moments and unforgettable experiences for your
                special occasions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Wedding Planning</li>
                <li>Birthday Parties</li>
                <li>Corporate Events</li>
                <li>Anniversary Celebrations</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="/" className="hover:text-pink-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/#gallery" className="hover:text-pink-400">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="/#services" className="hover:text-pink-400">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="hover:text-pink-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-pink-400">
                  <i className="fab fa-facebook text-2xl"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-pink-400">
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-pink-400">
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>© 2025 V3 Events. All rights reserved.</p>
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
  );
}

export default CategoryPage;