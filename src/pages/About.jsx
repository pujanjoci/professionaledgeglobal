import Suresh from '../assets/Suresh.png';
import About_Section from '../components/About_Section';

const About = () => {
  return (
    <>
      {/* Hero About Section */}
      <section id="about" className="py-20 bg-gray-50 mt-8">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">About</h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Professional Edge Global</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With over a decade of experience, we've helped hundreds of businesses transform their operations and achieve
              sustainable growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image section - left column but aligned right */}
            <div className="flex justify-end md:justify-end h-full">
              <img
                src={Suresh}
                alt="Suresh Sharma, Founder"
                className="w-[70%] md:w-[50%] h-auto rounded-lg shadow-lg object-cover"
              />
            </div>

            {/* Quote section - right side */}
            <div className="relative p-8">
              <div className="absolute top-0 left-0 text-gray-300 text-6xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <blockquote className="text-2xl italic text-gray-700 pl-12 mt-6">
                "Leadership is the capacity to translate vision into reality."
                <footer className="mt-4 text-xl font-semibold text-gray-800">
                  Founder - Suresh Sharma
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Additional About Content Section */}
      <About_Section /> 
    </>
  )
}

export default About