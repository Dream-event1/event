import React from 'react';

const About = () => {
  return (
    <div className="bg-pink-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">About Us</h1>
        <p className="max-w-2xl mx-auto text-lg">
          We turn your special moments into unforgettable memories with elegant event planning and stunning decoration services.
        </p>
      </section>

      {/* Who We Are */}
      <section className="py-12 px-6 md:px-20">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-semibold text-pink-500 mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            We are a passionate team of event planners and decorators specializing in weddings, birthdays, baby showers, corporate events,
            and more. From small intimate gatherings to grand celebrations, we bring your vision to life with creativity and care.
          </p>
        </div>
      </section>

      {/* Our Vision and Mission */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-20 py-12">
        <div className="bg-pink-100 p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold text-pink-700 mb-3">Our Vision</h3>
          <p>
            To become the most loved event management company known for transforming ideas into memorable celebrations.
          </p>
        </div>
        <div className="bg-pink-100 p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold text-pink-700 mb-3">Our Mission</h3>
          <p>
            To deliver personalized, elegant, and seamless events with passion, innovation, and a touch of magic.
          </p>
        </div>
      </section>

      {/* Services Highlights */}
      <section className="py-12 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-center text-pink-600 mb-10">What We Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Wedding Planning', desc: 'Elegant & memorable wedding ceremonies.' },
            { title: 'Birthday Decorations', desc: 'Fun, vibrant & customized birthday themes.' },
            { title: 'Baby Showers', desc: 'Charming celebrations for moms-to-be.' },
            { title: 'Corporate Events', desc: 'Professional & well-organized business events.' },
            { title: 'Anniversary Setup', desc: 'Romantic setups to relive the moments.' },
            { title: 'Custom Themes', desc: 'Unique decor based on your imagination.' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
              <h4 className="text-xl font-semibold text-pink-500 mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-pink-200">
        <h2 className="text-3xl font-bold text-pink-800 mb-4">Let’s Create Magic Together!</h2>
        <p className="text-gray-700 mb-6">Ready to plan your next big event? Contact us and let's start crafting your dream celebration.</p>
        <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full transition duration-300">
            <a
          href="https://wa.me/+918319200863"
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
         Contact us
        </a>
        </button>
      </section>
    </div>
  );
};

export default About;
