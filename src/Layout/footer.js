import React from 'react'
import { Link } from "react-router-dom";
import { footerLinks } from "../utils/data/footerLinks.data";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
      <footer className='layout-container pb-8 md:flex md:justify-between items-center text-white'>
        <div className='text-center md:text-left'>
          <div className="font-medium text-xl leading-6 uppercase mb-2">Vitruvius</div>
          <p className="text-sm leading-6">Copyright © {year} Scapula Labs, Inc. <br /> All rights reserved.</p>
        </div>
        {/* footer links */}
        <div className='space-x-4 mt-2 text-center'>
          {footerLinks.map((url, index) => (
            <Link 
              key={index}
              to={url.link}
              className="font-medium text-base leading-[30px]"
            >
              {url.name}
            </Link>
          ))}
        </div>
      </footer>
    )
}
