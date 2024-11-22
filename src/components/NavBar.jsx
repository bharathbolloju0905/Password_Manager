import React from 'react'


const NavBar = () => {
  return (
    <div className='flex justify-between bg-green-200 p-3'>
        <div className='hover:cursor-pointer font-bold text-xl max-[425px]:text-[15px]'>
           <span className='text-green-500'> &lt;</span><span >Pass</span><span className='text-green-500'>Mangr/&gt;</span>
        </div>
        <nav>
            <ul>
                <li className='m-1 font-medium max-[425px]:text-[14px] max-[425px]:font-semibold'>
                    <a className='hover:font-bold  p-2 max-[425px]:p-[4px]' href="/home">Home</a>
                    <a className='hover:font-bold  p-2 max-[425px]:p-[4px]' href="/about">About</a>
                    <a className='hover:font-bold  p-2 max-[425px]:p-[4px]' href="/service">Service</a>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default NavBar