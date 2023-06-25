import { useAppSelector } from '../../network/hooks';
import { RootState } from '../../network/store';

const FiltersDisplayPanel = () => {
    const { filterTerms } = useAppSelector((state: RootState) => state.products);

    return (
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
    )
}

export default FiltersDisplayPanel