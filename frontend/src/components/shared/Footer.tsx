import { StripeLogo, CurrencyBtc, PaypalLogo   } from "@phosphor-icons/react"
import { footerLinks } from "../../utils/data"

const Footer = () => {
  const getYear = () => {
    const currentYear = new Date().getFullYear();
    return currentYear;
  };

  return (
    <footer className="bg-black text-white">
      <div className="app-container px-[120px]">

        <div className="flex py-[40px] item-start">
          <div className="min-w-[450px]">
            <h1 className="text-[40px]">enchanté</h1>
            <p className="max-w-[350px] w-full">The midas in sourcing and curating high-end fashion products.</p>
          </div>

          <div className="flex space-x-20">
            <div className="flex space-x-20">
              {footerLinks.map((val, i) => (
                <ul className="" key={i}>
                  <li className="text-[16px] pb-[20px] uppercase">{val.header}</li>
                  {val.links.map((link, j) => (
                    <a href="#" key={j}>
                      <li className="opacity-70 pb-[10px] text-[14px] transition-all duration-300 hover:opacity-90">{link}</li>
                    </a>
                  ))}
                </ul>
              ))}
            </div>
            <div className="">
              <h1 className="text-[16px] pb-[20px] uppercase">PAYMENT METHODS</h1>
              <div className="flex space-x-5">
                <StripeLogo weight="bold" className="cursor-pointer" size={26} color="#a2a5b5" />
                <CurrencyBtc  weight="bold" className="cursor-pointer" size={26} color="#a2a5b5" />
                <PaypalLogo  weight="bold" className="cursor-pointer" size={26} color="#a2a5b5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[120px] py-4">
        <hr className="opacity-30" />
      </div>
      <div className="py-5">
        <p className="m-0 text-center text-white opacity-80 flex items-center justify-center s-480:text-[16px] text-[14px]">
         <span>Copyright ©{getYear()} enchanté. All rights reserved</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer