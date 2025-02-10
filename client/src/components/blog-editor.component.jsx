import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../imgs/logo.png';
import BlogBanner from '../imgs/blog banner.png';
import AnimationWrapper from '../common/page-animation';

export default function BlogEditor() {

    const handleBannerUpload = (e) => {
        let img = e.target.files[0];
        console.log(img);
        
    }
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={Logo} alt="Logo" />
        </Link>

        <p className="max-md:hidden text-black line-clamp-1 w-full">New Blog</p>

        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">



            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey ">
              <label htmlFor="uploadBanner">
                <img
                  src={BlogBanner}
                  alt="Blog Banner"
                  className="z-20"
                />
                <input type="file" id="uploadBanner" accept=".png, .jpg, .jpeg"
                onChange={handleBannerUpload}
                hidden />
              </label>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
}
