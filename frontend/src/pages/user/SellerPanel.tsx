import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
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
import { useNavigate } from 'react-router-dom';


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

const SellerPanel = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { products, isLoading } = useAppSelector(state => state.products)
    const [isColorGroupSelected] = useState(true)
    const randomRatings = Math.floor(Math.random() * 4) + 1;



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

    const productSchema = Yup.object().shape({
        name: Yup.string().required('title/name is required'),
        desc: Yup.string().required('description is required'),
        category: Yup.string().required('category is required'),
        image: Yup.string().required('image is required'),
        sizes: Yup.array().required('size(s) are required'),
        color: Yup.string().required('color is required'),
        price: Yup.number().required('price is required'),
        free_shipping: Yup.boolean().required('Free shipping is required'),
        brand: Yup.string().required('Brand is required'),
        new_product: Yup.boolean().required('New product is required'),
        discount: Yup.boolean().required('Discount is required'),
        star_ratings: Yup.number().required('Star ratings is required'),
    });

    const handleSubmit = async (values: Product, { resetForm }) => {
        try {
            const formData = await new FormData();
            if (values.image) {
                formData.append('image', values.image);
            }
            formData.append('name', values.name);
            formData.append('desc', values.desc);
            formData.append('category', values.category);
            formData.append('color', values.color);
            formData.append('free_shipping', String(values.free_shipping));
            formData.append('brand', values.brand);
            formData.append('price', String(values.price));
            formData.append('new_product', String(values.new_product));
            formData.append('discount', String(values.discount));
            formData.append('star_ratings', String(values.star_ratings));
            formData.append('sizes', values.sizes.join(','));

            await dispatch(createProduct({ productData: formData }));
            resetForm()
            navigate('/user/my-products')

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
            <Formik
                initialValues={initialValues}
                validationSchema={productSchema}
                onSubmit={handleSubmit}
            >
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
                            isColorGroupSelected={isColorGroupSelected}
                        />

                        <TextInput label='Price' name={'price'} type="number" placeholder='eg: $10' free_style='pt-6' />

                        <SizesSelect sizeArr={sizeArr} />

                        <Checkbox question={'Is free shipping available?'} props={props} checkbox_name={'free_shipping'} />
                        <Checkbox question={'Is it a new product?'} props={props} checkbox_name={'new_product'} free_style='s-480:py-6 py-3' />
                        <div className='flex items-center justify-between'>
                            <Checkbox question={'Is discount available?'} props={props} checkbox_name={'discount'} />
                            <Tooltip message={'Note that products are 30% off when discount is available'} />
                        </div>

                        <UploadPhoto setFieldValue={props.setFieldValue} uploadSrc={null} />

                        <button className="gen-btn-class p-2 bg-black text-white rounded-[5px] w-full flex items-center justify-center font-medium" type="submit">
                            {isLoading ?
                                <span className='flex items-center justify-center'> <Loader /> UPLOADING PRODUCT</span>
                                :
                                <span className='flex items-center justify-center'> <CloudArrowUp size={20} color="#fff" weight='bold' /> &nbsp;&nbsp; UPLOAD PRODUCT  </span>
                            }
                        </button>
                        {/* <pre>{JSON.stringify(props.values, null, 2)}</pre> */}
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