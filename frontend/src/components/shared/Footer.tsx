import { StripeLogo, CurrencyBtc, PaypalLogo } from "@phosphor-icons/react"
import { footerLinks } from "../../utils/data"
import LogoMain from "../../assets/svg/LogoMain";

const Footer = () => {
  const getYear = () => {
    const currentYear = new Date().getFullYear();
    return currentYear;
  };

  return (
    <footer className="bg-black text-white">
      <div className="app-container s-1025:px-[80px] s-767:px-[40px] px-[16px] ">

        <div className="s-991:flex block s-767:py-[40px] py-[20px] item-start">
          <div className="s-1440:min-w-[450px] s-767:min-w-[200px] min-w-[100%] s-991:pb-0 pb-[30px]">
            <LogoMain logo_width="s-480:w-[70px] w-[120px]" />
            <p className="max-w-[350px] s-767:text-[16px] text-[14px] w-full pt-[14px]">The midas in sourcing and curating high-end fashion products.</p>
          </div>

          <div className="w-full">
            <div className="col-span-3">
              <div className="grid s-767:grid-cols-4 grid-cols-2 s-767:gap-y-0  gap-y-[30px]">
                {footerLinks.map((val, i) => (
                  <ul className="" key={i}>
                    <li className="s-767:text-[16px] text-[14px] s-767:pb-[20px] pb-[10px] uppercase">{val.header}</li>
                    {val.links.map((link, j) => (
                      <a href="#" key={j}>
                        <li className="opacity-70 pb-[10px] text-[14px] transition-all duration-300 hover:opacity-90">{link}</li>
                      </a>
                    ))}
                  </ul>
                ))}
                <div>
                  <h1 className="s-767:text-[16px] text-[14px] s-767:pb-[20px] pb-[10px] uppercase whitespace-nowrap">PAYMENT METHODS</h1>
                  <div className="flex space-x-5">
                    <StripeLogo weight="bold" className="cursor-pointer" size={26} color="#a2a5b5" />
                    <CurrencyBtc weight="bold" className="cursor-pointer" size={26} color="#a2a5b5" />
                    <PaypalLogo weight="bold" className="cursor-pointer" size={26} color="#a2a5b5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[120px] s-767:py-4 py-2">
        <hr className="opacity-30" />
      </div>
      <div className="s-767:py-5 py-2">
        <p className="m-0 text-center text-white opacity-80 flex items-center justify-center s-480:text-[16px] text-[12px]">
          <span>Copyright ©{getYear()} enchanté. All rights reserved</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer