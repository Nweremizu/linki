import React from "react";

const Footer: React.FC = () => {
  // get the current year
  const year = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center w-full h-24 px-10 py-4 mt-10 md:justify-between text-neutral-800 border border-neutral-100">
      <p className="text-neutral-800">{`© ${year} Linki. All rights reserved.`}</p>
      <div className="flex items-center space-x-4">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
