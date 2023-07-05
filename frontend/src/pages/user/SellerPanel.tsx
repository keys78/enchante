import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextInput from '../../components/UI/TextInput'
import TextArea from '../../components/UI/TextArea'
import Dropdown from '../../components/UI/Dropdown'
import { useAppDispatch, useAppSelector } from '../../network/hooks'
import { useEffect } from 'react'
import { getAllProducts } from '../../reducers/products/productsSlice'
import { Product } from '../../types'
import Tooltip from '../../components/atoms/Tooltip'
import Checkbox from '../../components/atoms/Checkbox'
import UploadPhoto from '../../components/atoms/UploadPhoto'

const SellerPanel = () => {
    const { products } = useAppSelector(state => state.products)
    const dispatch = useAppDispatch();
    const validate = Yup.object({
        title: Yup.string().required("required"),
        description: Yup.string().required("required"),
        category: Yup.string().required("required"),
        color: Yup.string().required("required"),
        brand: Yup.string().required("required"),
        sizes: Yup.array().of(
            Yup.object().shape({
                description: Yup.string().required("Subtask description is required"),
            })
        ),
    })

    useEffect(() => {
        dispatch(getAllProducts(1))
    }, [dispatch])

    const brands = [...new Set(products?.map((val: Product) => val.brand))];
    const category = [...new Set(products?.map((val: Product) => val.category))];
    const color = [...new Set(products?.map((val: Product) => val.color))];
    const sizeArr = ['S', 'M', 'L', 'XL', 'XXL']



    return (
        <div className='border border-gray-200 p-4 rounded-[5px] mx-auto max-w-[500px] w-full'>
            <h1 className='font-medium mb-[20px]'>Create Product</h1>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    category: '',
                    color: '',
                    brand: '',
                    free_shipping: false,
                    new: false,
                    discount: false,
                    priority: '',
                    sizes: [],
                    star_ratings: Math.floor(Math.random() * 4) + 1,
                }}

                validationSchema={validate}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)

                    console.log('submit:', values);
                }}
            >
                {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                        <TextInput label='Title' name={'title'} type="input" placeholder='eg: Moccassino pants' />
                        <TextArea label="Description" name={'description'} type="text" placeholder="e.g. For rush hours, work and school, you can always count on..." />
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

                        <div>
                            <h3>Select Available Size</h3>
                            <div className='flex items-center space-x-3'>
                                {sizeArr.map((val: any) => {
                                    const isSelected = props.values.sizes.includes(val as never);

                                    const handleClick = () => {
                                        const { sizes } = props.values;
                                        const positionMap = { S: 0, M: 1, L: 2, XL: 3, XXL: 4 };
                                        const clickedIndex = sizes.indexOf(val as never);
                                        const currentSize = sizes[clickedIndex];

                                        if (clickedIndex !== -1) {
                                            // Size already exists in the array, will remove it
                                            const updatedSizes = sizes.filter((_, index) => index !== clickedIndex);
                                            props.setFieldValue('sizes', updatedSizes);
                                        } else {
                                            // Size doesn't exist in the array, lets add it at the appropriate position
                                            const position = positionMap[val];
                                            const updatedSizes = [...sizes];
                                            if (position < sizes.length && sizes[position] !== undefined) {
                                                updatedSizes.splice(position, 0, val as never);
                                            } else {
                                                updatedSizes.push(val as never);
                                            }
                                            if (currentSize !== undefined) {
                                                const currentSizeIndex = updatedSizes.indexOf(currentSize);
                                                updatedSizes.splice(currentSizeIndex, 1);
                                            }
                                            props.setFieldValue('sizes', updatedSizes);
                                        }
                                    };
                                    return (
                                        <div
                                            key={val}
                                            onClick={handleClick}
                                            className={`border border-black text-center flex items-center justify-center cursor-pointer rounded-[5px] h-[32px] w-[32px] ${isSelected && 'bg-black text-white'} `}
                                        >
                                            {val}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <TextInput label='Price' name={'price'} type="number" placeholder='eg: $10' />


                        <Checkbox question={'Is free shipping available?'} props={props} checkbox_name={'free_shipping'} />
                        <Checkbox question={'Is it a new product?'} props={props} checkbox_name={'new'} />
                        <div className='flex items-center justify-between'>
                            <Checkbox question={'Is discount available?'} props={props} checkbox_name={'discount'} />
                            <Tooltip message={'Note that products are 30% off when discount is available'} />
                        </div>

                        <UploadPhoto />


                        <button className="p-2 bg-black text-white rounded-[5px] w-full">
                            SUBMIT
                        </button>
                        <pre>{JSON.stringify(props.values, null, 2)}</pre>

                    </Form>
                )}
            </Formik>
        </div>
    )
}

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