import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../network/hooks";
import { CaretRight, Star } from "@phosphor-icons/react";
import ThumbnailsGallery from "../components/products/ThumbnailsGallery";
import RecentlyViewed from "../components/products/RecentlyViewed";

const ProductDetails = () => {
    const { id } = useParams();

    const { filteredProducts } = useAppSelector(state => state.products)
    const productInfo = filteredProducts.find(val => val.id === id)



    return (
        <section className="app-container mt-[12px] px-[120px]">
            <div className="pb-[200px]">
                <div className='pt-[30px] pb-[18px] flex items-center space-x-2'>
                    <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/'}>Home</Link> <CaretRight size={14} /> </span>
                    <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/products'}>Products</Link> <CaretRight size={14} /> </span>
                    <span className='font-medium'>{productInfo?.name}</span>
                </div>

                <div className="flex w-full space-x-5">
                    <div >
                        <img className="w-full" src={productInfo?.image} alt={productInfo?.name} />
                    </div>
                    <div className="product-info">
                        <h1 className="text-[30px]">{productInfo?.name}</h1>
                        <div className='flex'>
                            {Array.from({ length: (Number(productInfo?.star_ratings)) }, (_, i) => (
                                <Star key={i} size={20} color="#f9a83f" weight="fill" />
                            ))}
                            {Array.from({ length: 5 - (Number(productInfo?.star_ratings)) }, (_, i) => (
                                <Star key={i} size={20} color="#f9a83f" weight="regular" />
                            ))}
                        </div>
                        <p className="py-4">{productInfo?.desc}</p>
                    </div>
                </div>
            </div>

            <RecentlyViewed />
        </section>
    );
};

export default ProductDetails;
