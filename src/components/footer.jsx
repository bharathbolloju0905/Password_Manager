import React from 'react'

const Footer = () => {
  return (
    <div className='absolute bottom-[15px] bg-green-200  w-full text-center'>
        <div className='hover:cursor-pointer font-bold text-xl max-[425px]:text-[15px]'>
           <span className='text-green-500'> &lt;</span><span >Pass</span><span className='text-green-500'>Mangr/&gt;</span>
        </div>
        <div className='max-sm:text-[13px]'>Made with Love bY &copy; BharathBolloju </div>
    </div>
  )
}

export default Footer