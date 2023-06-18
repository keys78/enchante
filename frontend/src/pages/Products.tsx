import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../network/hooks";
import { RootState } from "../network/store";
import { Product } from "../types";
import { sortByHighestPrice, sortByLowestPrice, sortByNameAZ, sortByNameZA } from "../reducers/products/productsSlice";
import { Link } from 'react-router-dom';
import { CaretRight, SquaresFour, ListDashes, MagnifyingGlass, Funnel } from '@phosphor-icons/react';
import ProductFrame from '../components/products/ProductFrame';
// import NewsLetter from '../components/home/NewsLetter';
// import RecentlyViewed from '../components/products/RecentlyViewed';
import { AnimatePresence, motion } from 'framer-motion';
import useWindowSize from '../components/hooks/useWindowSize';
import AllFilters from '../components/filters/AllFilters';
import { modalVariants } from '../utils/animations';


const Products = () => {
    const dispatch = useAppDispatch();
    const { width } = useWindowSize();
    const { filteredProducts, filterTerms } = useAppSelector((state: RootState) => state.products);
    const [isFlexDisplay, setIsFlexDisplay] = useState<boolean>(false)
    const [currentSelection, setCurrentSelection] = useState("Select order....")


    const handleSelectionChange = (selectedValue) => {
        switch (selectedValue) {
            case 'Price (Lowest)':
                dispatch(sortByLowestPrice());
                break;
            case 'Price (Highest)':
                dispatch(sortByHighestPrice());
                break;
            case 'Name (A - Z)':
                dispatch(sortByNameAZ());
                break;
            case 'Name (Z - A)':
                dispatch(sortByNameZA());
                break;
            default:
                break;
        }
    };




    return (
        <section className="w-full mt-[12px] s-1024:px-[120px] s-767:px-[40px] px-[16px]">
            <div>
                <div className='s-480:pt-[30px] pt-[18px] pb-[18px] flex items-center space-x-2'>
                    <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/'}>Home</Link> <CaretRight size={14} /> </span> <span className='font-medium'>Products</span>
                </div>

                <div className='flex items-start space-x-5'>

                    <AnimatePresence>
                        {
                            width > 767 ?
                                <AllFilters allFilterCompStyles={'min-w-[200px] max-w-[200px] w-full rounded-[5px] border p-1'} /> :
                                <motion.div
                                    variants={modalVariants as any}
                                    initial="initial"
                                    animate="final"
                                    exit="exit"
                                    className='filterbar-wrapper w-[300px] bg-white text-textGray h-[100vh] fixed top-0 left-0 p-[20px] '
                                >
                                    <AllFilters allFilterCompStyles={'mt-[80px] w-full rounded-[5px] border p-1'} />
                                </motion.div>
                        }
                    </AnimatePresence>


                    <div className='w-full'>
                        {width < 1024 &&
                            <form className='flex space-x-3 items-center justify-center w-full mx-auto mb-[10px]'>
                                <div className='flex space-x-2 border items-center rounded-[5px] px-2 w-full'>
                                    <MagnifyingGlass size={20} color="#9e9e9e" />
                                    <input className='w-full rounded-[5px] py-2 border-0 outline-none' type="email" placeholder='Search products, brands and categories' />
                                </div>
                                <button className='px-4 bg-[#202122] text-white rounded-[5px] py-2'>Search</button>
                            </form>
                        }
                        <div className='flex items-center justify-between space-x-10 w-full mb-3'>
                            <div className='whitespace-nowrap flex items-center s-480:space-x-4 space-x-3'>
                                {width < 767 && <Funnel size={22} color="#141414" />}
                                <SquaresFour className='cursor-pointer' onClick={() => setIsFlexDisplay(false)} size={width < 767 ? 22 : 30} color={`${isFlexDisplay ? "" : '#f75a2c'}`} weight="fill" />
                                <ListDashes className='cursor-pointer' onClick={() => setIsFlexDisplay(true)} size={width < 767 ? 22 : 30} color={`${!isFlexDisplay ? "" : '#f75a2c'}`} weight="fill" />
                                <div><span className='font-medium s-480:text-[20px] text-[16px]'>{filteredProducts.length}</span> result{filteredProducts.length === 1 ? '' : 's'}</div>
                            </div>
                            {width > 1024 &&
                                <form className='flex space-x-3 items-center justify-center w-full mx-auto'>
                                    <div className='flex space-x-2 border items-center rounded-[5px] px-2 w-full'>
                                        <MagnifyingGlass size={20} color="#9e9e9e" />
                                        <input className='w-full rounded-[5px] py-2 border-0 outline-none' type="email" placeholder='Search products, brands and categories' />
                                    </div>
                                    <button className='px-4 bg-[#202122] text-white rounded-[5px] py-2'>Search</button>
                                </form>
                            }

                            <div>
                                <select
                                    value={currentSelection}
                                    onChange={(e) => {
                                        setCurrentSelection(e.target.value);
                                        handleSelectionChange(e.target.value);
                                    }}
                                    className="border-2 border-black rounded p-2 text-sm cursor-pointer"
                                >
                                    <option disabled value="Select Order">Select Order...</option>
                                    <option value="Price (Lowest)">Price (Lowest)</option>
                                    <option value="Price (Highest)">Price (Highest)</option>
                                    <option value="Name (A - Z)">Name (A - Z)</option>
                                    <option value="Name (Z - A)">Name (Z - A)</option>
                                </select>

                            </div>

                        </div>

                        <div className='flex items-center space-x-2 text-xs mb-[12px]'>
                            {Object.keys(filterTerms).length > 0 && <h3 className="text-gray-400">Applied Filters:</h3>}
                            {Object.entries(filterTerms).map(([key, value], index) => (
                                <div
                                    className='opacity-60 px-2 py-1 border rounded-[20px] lowercase'
                                    key={key}
                                    style={{ backgroundColor: `rgba(300, 300, 300, ${0.8 - (index + 1) * 0.1})` }}
                                >
                                    {key === 'category' && value !== null && <span className="text-gray-500">{value}</span>}
                                    {key === 'color' && value !== null && <span className="text-gray-500">{value}</span>}
                                    {key === 'brand' && value !== null && <span className="text-gray-500">{value}</span>}
                                    {key === 'price' && value !== null && <span className="text-gray-500">{`prices below: $${Number(value) + 1}`}</span>}
                                    {key === 'starNumberOfRatings' && value !== null && (<span className="text-gray-500"> {`${value === "1" ? '1 star' : `${value} stars`}`} </span>)}
                                    {key === 'freeShipping' && value === "true" && <span className="text-gray-500"> free shipping</span>}
                                    {key === 'newProduct' && value === "true" && <span className="text-gray-500"> new product</span>}
                                </div>
                            ))}
                        </div>


{/* <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi amet maiores magnam, quidem dolorum nulla dolor sunt reprehenderit iste quis ab hic doloremque, alias a impedit aspernatur autem animi quaerat! Rerum fugiat magni illo commodi nemo, non perferendis repudiandae excepturi dolores odio. Amet illo accusantium laborum voluptatum ullam debitis. Nulla, aliquid obcaecati accusamus unde velit quibusdam dolores, ex, laborum repellat suscipit dignissimos. Quas vel distinctio, nihil eum maxime, voluptas repellendus odio iusto, suscipit cumque iste fugiat consequatur? Eligendi quo fugit animi cum laudantium ea quod deserunt dicta at labore, velit mollitia quidem maiores eaque perferendis eos corrupti doloremque numquam corporis natus ex magni illum rerum consequatur! Unde excepturi ullam nemo id aliquam expedita odio at molestias quaerat, beatae saepe inventore ipsa quod omnis dignissimos dolore voluptatum ipsum? Ab quis molestias illo placeat culpa saepe incidunt mollitia dolorum, magni deleniti alias sint optio voluptate quisquam asperiores. Quo nesciunt tenetur ipsam amet reprehenderit. Ipsam explicabo sapiente cupiditate est non illum, doloribus rerum qui voluptas, dolores aperiam vel numquam at rem beatae modi adipisci, minima architecto sint quas exercitationem? Cum eaque libero eligendi delectus culpa? Architecto similique eius corrupti, sequi qui libero amet adipisci, possimus illum alias impedit! Quas adipisci aut magni illum odio? Earum a rem architecto labore, necessitatibus sed, vitae dolorem quas quasi totam, ipsum optio doloribus amet ut blanditiis voluptatum deserunt cum maxime distinctio. Earum aspernatur laborum nihil aut quam id corrupti ab voluptatibus non consequuntur dicta a optio nulla vitae architecto, quod velit cumque tenetur adipisci, suscipit, necessitatibus totam fugiat! Fuga nihil praesentium molestiae vel repudiandae quas maiores cum velit dicta quis, blanditiis cupiditate itaque vero, facilis odit dolores tempora sunt tempore numquam optio magnam dolorem quasi. Odio minima vero nihil error voluptas ratione, facere ad veritatis excepturi. Soluta consectetur inventore autem fuga? Facilis recusandae illo, ratione nulla repellendus veritatis eius, tenetur quidem incidunt unde nemo sequi quibusdam debitis quasi esse nesciunt iste! Eaque sunt, cupiditate rerum quam iste nihil vero commodi dolorum ut fugiat consequuntur! Illo inventore minus dolor suscipit adipisci sunt ipsa distinctio nostrum quia quam sint nesciunt, accusamus illum numquam. Possimus, tenetur molestiae! Iure nostrum eaque ea. In repellendus corporis, asperiores vero aspernatur minima. Labore incidunt quis accusantium perferendis cum, tenetur commodi voluptate eveniet cupiditate, ipsa vero optio reprehenderit facere magnam natus molestias, quisquam corporis. Vel atque autem quo ipsam accusantium, tempora similique! Impedit possimus nemo illo nam eligendi et veniam expedita minus, voluptatum facilis minima reiciendis quia repudiandae deserunt rerum atque animi doloribus vitae facere libero, corrupti alias unde debitis. Porro quidem quam corporis laudantium aliquid explicabo consequatur minima voluptates quibusdam eligendi, tenetur sed magni qui harum non culpa mollitia ipsa iure voluptatem. Nobis, laborum repudiandae iusto aut hic rerum nemo vitae aliquid alias consequatur accusantium, inventore culpa cum vel fugiat beatae? Consequatur iusto deleniti sunt dolorem? Praesentium quidem soluta libero sequi molestias et alias reprehenderit accusantium rerum dolorem ea non provident eaque fuga possimus cum commodi dicta sed aspernatur aliquam voluptas, porro voluptatum magni suscipit? Magnam voluptates nesciunt tempore omnis corporis dolores quasi totam hic aspernatur similique! Cumque cum nostrum facilis dolores inventore quod necessitatibus aut rerum dolor aliquam? Alias doloremque saepe eveniet consequuntur a, fugit neque? Esse nostrum maxime, inventore et similique pariatur praesentium non iure culpa saepe quas, officiis delectus minus sapiente porro rem! Quidem voluptate natus voluptatem. Repellat ipsa quaerat nemo similique, illo numquam tempore autem natus dolorem repellendus eligendi cupiditate voluptatibus minima in maxime perspiciatis beatae facilis dignissimos quas neque quod minus ut velit! Quaerat ipsam error, excepturi nostrum exercitationem impedit voluptas ab repellendus quisquam cupiditate velit quo dignissimos repellat enim. Iusto, maxime. Iure asperiores distinctio, facilis eaque itaque blanditiis odio recusandae reiciendis sequi similique a corporis, numquam perspiciatis ex et velit? Dolorum molestiae dolorem, accusantium corrupti voluptatem nulla qui dicta nesciunt velit earum in soluta dignissimos itaque eius eos, impedit deleniti sunt animi aliquam quidem sequi quis tempore! Laudantium, eum voluptatem sapiente vel fuga dolorem asperiores cupiditate amet incidunt distinctio? Voluptates ipsa culpa ex atque, eos, ratione esse porro dolore consequuntur autem iure, nihil quod veniam neque quibusdam deleniti magnam. Similique repudiandae magni maiores veniam dolores modi, fuga ipsa, numquam consectetur, molestias totam excepturi deserunt ut necessitatibus et in delectus odit. Beatae deserunt asperiores, laboriosam reiciendis numquam odio fuga ea totam repellat quam ex illum non maiores explicabo enim quisquam aliquam debitis praesentium mollitia! Magnam distinctio ipsam consectetur at vero commodi? Asperiores dolor molestiae autem molestias, quos quasi quis magnam quidem praesentium. Nobis illum ducimus doloremque eligendi necessitatibus? Eligendi maxime id incidunt atque odit ipsam reiciendis! Eius iusto, possimus est fugiat labore similique optio repudiandae nihil fugit debitis delectus magni necessitatibus consequuntur obcaecati laudantium cumque dolorum atque aspernatur, dignissimos, quasi saepe dolore impedit! Mollitia deserunt modi laborum voluptatibus non, fuga commodi quod ab vero repellat deleniti vel quis velit quae quos in, perspiciatis, quaerat optio. Provident quaerat, porro blanditiis nihil minus praesentium autem delectus temporibus tempora voluptas quasi rem quod consequatur omnis deserunt quidem iusto corporis tenetur. Omnis officiis qui ab, odit ad similique amet voluptatibus. Ab magni dignissimos ipsa voluptatem atque nisi dolorem explicabo sapiente ipsum quia eum nesciunt incidunt, accusantium, consectetur doloremque inventore tempora, iusto voluptate esse quas velit. Sint dolore, dolorum numquam sed exercitationem porro. Aliquid, quas nam. Doloribus officiis aut, dolor natus, quidem nisi mollitia dolore soluta non omnis, est commodi minus labore? Molestiae veritatis beatae id maxime, alias magni reiciendis saepe, quasi libero odit qui iste cumque culpa dolor amet deserunt quia sint. Delectus at doloremque rem sapiente beatae aliquam culpa, sequi voluptatibus magni recusandae iste placeat rerum odio pariatur unde dolorem impedit ex magnam consequatur aspernatur. Blanditiis ad rem in optio qui, explicabo dolores minus. Porro at amet ipsa necessitatibus sit ipsum tenetur soluta aspernatur velit blanditiis? Tempora magnam molestiae vel similique asperiores, vero quae, eius nisi vitae quasi, ullam perferendis amet neque sunt aut voluptas quam molestias alias. At ad perferendis ut reprehenderit iusto impedit sint, cum nostrum neque alias deserunt ipsa voluptatibus ipsum ex dignissimos quis nisi harum! Eos vitae labore deleniti, nam voluptatem voluptatibus consequuntur nobis, ipsam, repellat dolorem voluptatum.</div> */}
                        {filteredProducts.length > 0 ? (
                            <>
                                <div className={`${!isFlexDisplay && 'grid s-1024:grid-cols-3 grid-cols-2 s-480:gap-x-[16px] gap-x-[8px] s-480:gap-y-[34px] gap-y-[16px]'} `}>
                                    {filteredProducts.map((product: Product, i: number) =>
                                        <div className='relative w-full s-480:bg-white bg-gray-50 p-1 rounded-[5px]'>
                                            <AnimatePresence>
                                                <ProductFrame
                                                    product={product}
                                                    showControls={true}
                                                    key={i}
                                                    isFlexDisplay={isFlexDisplay}
                                                    price_font_size='s-480:text-[18px] text-[16px] font-bold'
                                                    discount_font_size={'text-[12px]'}
                                                    shop_button={'p-[4px]'}
                                                    icon_size={18}
                                                />
                                            </AnimatePresence>
                                        </div>
                                    )}
                                </div>
                                <p className='pt-[30px]'>Add Pagination from backend here</p>
                            </>
                        ) : (
                            <p className='flex items-center justify-center h-[300px]'>No products available.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* <RecentlyViewed /> */}
            {/* <NewsLetter newsletter_extras={'pt-[120px]'} /> */}


        </section>
    );
};

export default Products;
