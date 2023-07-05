import { useState } from 'react'
import { Upload } from '@phosphor-icons/react';


const UploadPhoto = () => {
    const [theme, setTheme] = useState<string>()
    const imageHandler = (e: any) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setTheme(`url(${reader.result})`)
            }
        }
        reader.readAsDataURL(e.target.files[0])

    };



    return (
        <section>
            <div>
                <img src={theme} alt="" />
            </div>

            <span className='file'>
                <label htmlFor='input-file'>
                    <div className='space-new'>
                        <Upload size={20} color="#fff" weight="duotone" />&nbsp;&nbsp;
                        <p>Upload Theme</p>
                    </div>
                </label>
                <input id='input-file' accept="image/*" type='file' onChange={(e) => imageHandler(e)} />
            </span>

        </section>
    )
}



export default UploadPhoto;