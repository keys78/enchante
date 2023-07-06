import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextInput from '../../components/UI/TextInput'
import TextArea from '../../components/UI/TextArea'
import Dropdown from '../../components/UI/Dropdown'
import { useAppDispatch, useAppSelector } from '../../network/hooks'
import { useEffect } from 'react'
import { createProduct, getAllProducts } from '../../reducers/products/productsSlice'
import { Product } from '../../types'
import Tooltip from '../../components/atoms/Tooltip'
import Checkbox from '../../components/atoms/Checkbox'
import UploadPhoto from '../../components/atoms/UploadPhoto'
import SizesSelect from '../../components/atoms/SizesSelect'

const SellerPanel = () => {
    const { products } = useAppSelector(state => state.products)
    const dispatch = useAppDispatch();
    const validate = Yup.object({
        name: Yup.string().required("required"),
        desc: Yup.string().required("describe your product"),
        category: Yup.string().required("required"),
        color: Yup.string().required("required"),
        brand: Yup.string().required("required"),
        // sizes: Yup.array().of(
        //     Yup.object().shape({
        //         desc: Yup.string().required("Subtask desc is required"),
        //     })
        // ),
    })

    useEffect(() => {
        dispatch(getAllProducts(1))
    }, [dispatch])

    const brands = [...new Set(products?.map((val: Product) => val.brand))];
    const category = [...new Set(products?.map((val: Product) => val.category))];
    const color = [...new Set(products?.map((val: Product) => val.color))];
    const sizeArr = ['S', 'M', 'L', 'XL', 'XXL']



    return (
        <div className='s-480:border border-gray-200 s-480:p-4 rounded-[5px] mx-auto max-w-[600px] w-full'>
            <h1 className='font-medium mb-[20px]'>Create Product</h1>
            <Formik
                initialValues={{
                    name: '',
                    desc: '',
                    category: '',
                    image: '',
                    color: '',
                    brand: '',
                    free_shipping: false,
                    new: false,
                    discount: false,
                    sizes: [],
                    star_ratings: Math.floor(Math.random() * 4) + 1,
                }}

                // validationSchema={validate}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    dispatch(createProduct({ productData: values }))
                    // resetForm()
                    console.log('submit:', values);
                    // setSubmitting(false)
                }}
            >
                {(props) => (
                    <Form onSubmit={props.handleSubmit}>
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
                        <TextInput label='Price' name={'price'} type="number" placeholder='eg: $10' free_style='pt-6'/>

                        <SizesSelect sizeArr={sizeArr} props={props} />

                        <Checkbox question={'Is free shipping available?'} props={props} checkbox_name={'free_shipping'} />
                        <Checkbox question={'Is it a new product?'} props={props} checkbox_name={'new'} free_style='py-6'/>
                        <div className='flex items-center justify-between'>
                            <Checkbox question={'Is discount available?'} props={props} checkbox_name={'discount'} />
                            <Tooltip message={'Note that products are 30% off when discount is available'} />
                        </div>

                        <UploadPhoto props={props} />

                        <button type='submit' className="p-2 bg-black text-white rounded-[5px] w-full">
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