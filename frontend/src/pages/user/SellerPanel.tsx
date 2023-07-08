import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { createProduct, getAllProductsTwo } from '../../reducers/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import TextInput from '../../components/UI/TextInput';
import TextArea from '../../components/UI/TextArea';
import Dropdown from '../../components/UI/Dropdown';
import Checkbox from '../../components/atoms/Checkbox';
import Tooltip from '../../components/atoms/Tooltip';
import SizesSelect from '../../components/atoms/SizesSelect';
import UploadPhoto from '../../components/atoms/UploadPhoto';
import Loader from '../../components/UI/Loader';
import { CloudArrowUp } from '@phosphor-icons/react';

interface SellerPanelProps {
    onProductCreated: (productData: Product) => void;
}

interface Product {
    category: string;
    name: string;
    image: string;
    desc: string;
    sizes: string[];
    color: string;
    free_shipping: boolean;
    brand: string;
    price?: number;
    new_product: boolean;
    discount: boolean;
    star_ratings: number;
}

const SellerPanel: React.FC<SellerPanelProps> = () => {
    const dispatch = useAppDispatch();
    const { products, isLoading } = useAppSelector(state => state.products)
    const randomRatings = Math.floor(Math.random() * 4) + 1

    useEffect(() => {
        dispatch(getAllProductsTwo({}));
    }, [dispatch])

    const initialValues: Product = {
        category: '',
        name: '',
        image: '',
        desc: '',
        sizes: [],
        color: '',
        free_shipping: false,
        brand: '',
        new_product: false,
        discount: false,
        star_ratings: randomRatings,
    };

    const handleSubmit = async (values: Product) => {
        try {
            const formData = new FormData();
            if (values.image) {
                formData.append('image', values.image);
            }
            formData.append('category', values.category);
            formData.append('name', values.name);
            formData.append('desc', values.desc);
            formData.append('color', values.color);
            formData.append('free_shipping', String(values.free_shipping));
            formData.append('brand', values.brand);
            formData.append('price', String(values.price));
            formData.append('new_product', String(values.new_product));
            formData.append('discount', String(values.discount));
            formData.append('star_ratings', String(values.star_ratings));
            formData.append('sizes', values.sizes.join(','));

            dispatch(createProduct({ productData: formData }));

        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const brands = [...new Set(products?.map((val: Product) => val.brand))];
    const category = [...new Set(products?.map((val: Product) => val.category))];
    const color = [...new Set(products?.map((val: Product) => val.color))];
    const sizeArr = ['S', 'M', 'L', 'XL', 'XXL']


    return (
        <div className='s-480:border border-gray-200 s-480:p-4 rounded-[5px] mx-auto max-w-[600px] w-full'>
            <h1 className='font-medium mb-[20px]'>Create Product</h1>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {(props) => (
                    <Form>
                        <TextInput label='Title' name={'name'} type="input" placeholder='eg: Moccassino pants' />
                        <TextArea label="Description" name={'desc'} type="text" placeholder="e.g. For rush hours, work and school, you can always count on..." />

                        <Dropdown
                            item={category}
                            setItem={props?.setFieldValue}
                            placeholder='Enter category name or select from the list'
                            label={'category'}
                        />
                        <Dropdown
                            item={brands}
                            setItem={props?.setFieldValue}
                            placeholder='Enter brand name or select from the list'
                            label={'brand'}
                        />
                        <Dropdown
                            item={color}
                            setItem={props?.setFieldValue}
                            placeholder='Enter product color or select from the list'
                            label={'color'}
                        />

                        <TextInput label='Price' name={'price'} type="number" placeholder='eg: $10' free_style='pt-6' />

                        <SizesSelect sizeArr={sizeArr} props={props} />

                        <Checkbox question={'Is free shipping available?'} props={props} checkbox_name={'free_shipping'} />
                        <Checkbox question={'Is it a new product?'} props={props} checkbox_name={'new_product'} free_style='py-6' />
                        <div className='flex items-center justify-between'>
                            <Checkbox question={'Is discount available?'} props={props} checkbox_name={'discount'} />
                            <Tooltip message={'Note that products are 30% off when discount is available'} />
                        </div>

                        <UploadPhoto setFieldValue={props.setFieldValue} />
                        <button className="p-2 bg-black text-white rounded-[5px] w-full" type="submit">
                            {isLoading ? <Loader /> :
                                <span className='flex items-center justify-center'>
                                    <CloudArrowUp size={20} color="#fff" weight='bold' /> &nbsp;&nbsp; UPLOAD PRODUCT
                                </span>
                            }
                        </button>
                    </Form>
                )}

            </Formik>
        </div>

    );
};

export default SellerPanel;


{/* <div onClick={() => props.setFieldValue('sizes', [...props.values.sizes, val])} className={`border border-black text-center flex items-center justify-center cursor-pointer rounded-[5px] h-[32px] w-[32px] `}>{val}</div> */ }
// const handleClick = () => {
//     const { sizes } = props.values;

//     if (sizes.includes(val)) {
//         const updatedSizes = sizes.filter((size) => size !== val);
//         props.setFieldValue('sizes', updatedSizes);
//     } else {
//         const updatedSizes = [val, ...sizes];
//         props.setFieldValue('sizes', updatedSizes);
//     }
// };