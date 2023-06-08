
const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="app-container px-[120px]">
        <div className="flex items-center justify-between py-9 ">
          <h1 className="text-[40px]">pickMe</h1>
          <div>
            <h3>Be the first to get important updates and changes around here.</h3>
            <div className="flex"><input type="text" /><button className="rgb(68 71 87)">Subscribe</button></div>
          </div>
        </div>
        <div>
          <div>
            <ul>
              <li className="text-[17px] pb-[20px]">Get to Know Us</li>
              <a href="">
                <li className="opacity-75 pb-[10px] font-thin text-[14px] transition-all duration-300 hover:tracking-wider	">Careers</li>
              </a>
              <a href="">
                <li className="opacity-75 pb-[10px] font-thin text-[14px] transition-all duration-300 hover:tracking-wider">Blog</li>
              </a>
              <a href="">
                <li className="opacity-75 pb-[10px] font-thin text-[14px] transition-all duration-300 hover:tracking-wider">About PickMe</li>
              </a>
              <a href="">
                <li className="opacity-75 pb-[10px] font-thin text-[14px] transition-all duration-300 hover:tracking-wider">Investor Relations</li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer