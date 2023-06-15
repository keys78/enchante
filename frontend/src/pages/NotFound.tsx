import { Link } from "react-router-dom"
import cartie from '../assets/png/not_found_cart.avif'

const NotFound = () => {
  return (
    <section className="h-[100vh] w-[100%] flex justify-center">
      <div className="text-center sm:mt-[300px] mt-[80px] text-xs">
        <div className="w-[400px]">
          <img className="w-full" src={cartie} alt="enchante_cart" />
        </div>
        <div className="py-[30px]">Page Not Found</div>
        <div>Click <Link className="text-orangeSkin underline" to={'/'}>Here</Link> to Continue shopping... </div>
      </div>
    </section>
  )
}

export default NotFound