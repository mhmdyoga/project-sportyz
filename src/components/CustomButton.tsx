import Image from 'next/image'
import React from 'react'

const CustomButton = ({titles, Click, style, img }: CustomButtonProps) => {
  return (
    <div>
        <button onClick={Click} className={style}>
            {titles}
            <div className='mt-0'>
            <Image src={`${img}`} alt='title' width={20} height={20} />
            </div>
        </button>       
    </div>
  )
}

export default CustomButton