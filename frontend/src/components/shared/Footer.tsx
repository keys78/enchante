import { FacebookLogo, InstagramLogo, TwitterLogo } from "@phosphor-icons/react"
import { footerLinks } from "../../utils/data"

const Footer = () => {
  const getYear = () => {
    const currentYear = new Date().getFullYear();
    return currentYear;
  };

  return (
    <footer className="bg-black text-white">
      <div className="app-container px-[120px]">
        <div className="flex items-center justify-between pt-9 pb-20">
          <h1 className="text-[40px]">pickMe</h1>
          <div>            
            <div className="flex border border-btnGray rounded-br w-full">
              <input className="w-full border-none outline-none p-2 rounded-tl rounded-br text-btnGray" type="text" placeholder="Subscribe to our newsletter" />
              <button className="bg-btnGray text-white rounded-br py-1 px-4">Subscribe</button></div>
          </div>
        </div>
        <div className="">
          <div className="flex items-start justify-between max-w-[1000px]">
            {footerLinks.map((val, i) => (
              <ul key={i}>
                <li className="text-[16px] pb-[20px] opacity-80">{val.header}</li>
                {val.links.map((link, j) => (
                  <a href="#" key={j}>
                    <li className="opacity-50 pb-[10px] font-thin text-[14px] transition-all duration-300 hover:tracking-wider">{link}</li>
                  </a>
                ))}
              </ul>
            ))}
            <div className="flex space-x-5 mt-[100px]">
              <FacebookLogo className="cursor-pointer" size={26} color="#a2a5b5" weight="duotone" />
              <TwitterLogo className="cursor-pointer" size={26} color="#a2a5b5" weight="duotone" />
              <InstagramLogo className="cursor-pointer" size={26} color="#a2a5b5" weight="duotone" />

            </div>
          </div>
        </div>
      </div>
      <div className="py-4">
        <hr className="opacity-30" />
      </div>
      <div className="py-5">
        <p className="m-0 text-center text-white opacity-80 flex items-center justify-center s-480:text-[16px] text-[14px]">
          <span className="text-[10px]">©</span>&nbsp; <span>Copyright - pickMe Online@{getYear()}</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer