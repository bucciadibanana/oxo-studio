import { FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white relative md:-mt-24 mb-6">
      <div className="container mx-auto px-4 flex justify-between items-center py-4  rounded-lg shadow-lg">
        
        {/* Left Side: Text Info */}
        <div className="text-left">
          <p className="antonio2 text-sm">Oxo Studi S.R.L </p>
          <p className="antonio2 text-sm">P.Iva 01609600117</p>
          <p className="antonio2 text-sm">Privacy & Cooky Policy</p>
        </div>

        {/* Right Side: Social Icons */}
        <div className="flex space-x-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="text-2xl hover:text-blue-600 transition-colors" />
          </a>
          <a href="https://www.instagram.com/oxo_studio_oxo/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl hover:text-pink-500 transition-colors" />
          </a>
          <a href="https://github.com/tuo-username" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl hover:text-gray-400 transition-colors" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;