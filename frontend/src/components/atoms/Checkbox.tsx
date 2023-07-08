
const Checkbox = ({question, checkbox_name, free_style = '', props}) => {
    return (
        <div className={`flex items-center space-x-2 ${free_style}`}>
            <div className="checkbox-wrapper-19">
                <input name={checkbox_name} id={checkbox_name} type="checkbox" onChange={(e) => props.setFieldValue(checkbox_name, e.target.checked)} />
                <label className="check-box" htmlFor={checkbox_name}>
                </label>
            </div>
            <p className="-mt-1 s-480:text-[16px] text-[14px]">{question}</p>
        </div>
    )
}

export default Checkbox