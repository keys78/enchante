import { Formik, FieldArray, Form } from 'formik'
import * as Yup from 'yup'
import TextInput from '../../components/UI/TextInput'
import TextArea from '../../components/UI/TextArea'
import Dropdown from '../../components/UI/Dropdown'
import { useAppDispatch, useAppSelector } from '../../network/hooks'
import { useEffect } from 'react'
import { getAllProducts } from '../../reducers/products/productsSlice'
import { Product } from '../../types'

const SellerPanel = () => {
    const { products } = useAppSelector(state => state.products)
    const dispatch = useAppDispatch();
    const validate = Yup.object({
        title: Yup.string().required("required"),
        description: Yup.string().required("required"),
        status: Yup.string().required("required"),
        subTasks: Yup.array().of(
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






    return (
        <div className='border border-gray-200 p-4 rounded-[5px] mx-auto max-w-[500px] w-full'>
            <h1 className='font-medium mb-[20px]'>Create Product</h1>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    brand: '',
                    free_shipping:false,
                    priority: '',
                    subTasks: [],
                }}

                validationSchema={validate}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)

                    console.log('submit:', values);
                    // dispatch(addTask({ boardId: board?._id, taskData: values }))
                    // dispatch(getBoard({ id: board?._id }))
                    // resetForm()
                    // dispatch(getBoard({ id: board?._id }))
                    // dispatch(getBoard({ id: board?._id }))
                    // setShowModal(false)
                    // dispatch(getBoard({ id: board?._id }))
                }}
            >
                {/* {({ values,  isSubmitting, handleSubmit }) => ( */}
                {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                        <TextInput label='Title' name={'title'} type="input" placeholder='eg: Moccassino pants' />
                        <TextArea label="Description" name={'description'} type="text" placeholder="e.g. For rush hours, work and school, you can always count on..." />
                        <Dropdown
                            item={category}
                            setItem={props?.setFieldValue}
                            placeholder='Enter category name or select from the list'
                            label={'Category'}
                        />
                        <Dropdown
                            item={brands}
                            setItem={props?.setFieldValue}
                            placeholder='Enter brand name or select from the list'
                            label={'Brand'}
                        />
                        <Dropdown
                            item={color}
                            setItem={props?.setFieldValue}
                            placeholder='Enter product color or select from the list'
                            label={'Color'}
                        />
                        <TextInput label='Price' name={'price'} type="number" placeholder='eg: $10' />

                        <div className='flex items-center space-x-2'>
                            <p>Is free shipping</p>
                        {/* <input name={free_shipping} type="checkbox" /> */}
                        </div>



                        <label className="body-md text-sm font-bold capitalize text-mediumGrey dark:text-white mt-6 block">
                            subtasks
                        </label>

                        <FieldArray name="subTasks"
                            render={arrayHelpers => (
                                <div>
                                    {props.values?.subTasks?.map((_, i) => (
                                        <div key={i} className="flex">
                                            <TextInput label='' name={`subTasks.${i}.description`} type="text" placeholder="e.g. Archived" />

                                            <button onClick={() => arrayHelpers.remove(i)}
                                                className="text-mediumGrey hover:text-mainRed ml-4"
                                            >
                                                <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                                                    <g fill="currentColor" fillRule="evenodd">
                                                        <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                                                        <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <br />

                                    {props.values?.subTasks?.length <= 4 &&
                                        <button
                                            type='button'
                                            onClick={() => arrayHelpers.push({ category:''})}
                                            className={'bg-[#635FC71A] rounded-full w-full py-[7px] mb-3 text-mainPurple transition duration-200 text-base hover:bg-mainPurpleHover font-sans'}
                                        >
                                            {'+ Add New Subtask'}
                                        </button>
                                    }
                                </div>
                            )}
                        />

                        {/* <StatusDropdown status={status && status} setStatus={props?.setFieldValue} label={'Status'} /> */}
                        {/* <PriorityDropdown setStatus={props?.setFieldValue} label={'Priority'} /> <br /> */}

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

export default SellerPanel