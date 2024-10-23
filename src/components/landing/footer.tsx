import React from "react";

const Footer: React.FC = () => {
  // get the current year
  const year = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center w-full h-24 px-10 py-4 mt-10 md:justify-between bg-zinc-900">
      <p className="text-white">{`© ${year} Linki. All rights reserved.`}</p>
      <div className="flex items-center space-x-4">
        <a href="#" className="text-white">
          Privacy Policy
        </a>
        <a href="#" className="text-white">
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;
