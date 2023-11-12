import React, { useEffect, useState } from 'react'
import { Link, NavLink, matchPath, useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/K_Logo.png'
import Button from '../Core/HomePage/Button'
import OtherButton from '../Core/HomePage/OtherButton'
import { navbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart, AiOutlineMenu } from 'react-icons/ai'
import { BsCart } from 'react-icons/bs'
import ProfileDropdown from '../Core/Auth/ProfileDropdown'
import { apiConnector } from '../../services/apiConnector'
import { ACCOUNT_TYPE } from '../../utils/constants'


const NavbarMobile = () => {
    const [isNavOpen, setIsNavOpen] = useState(false)
    //console.log(isNavOpen)
    const {token} = useSelector((state) => state.auth)
    const {totalItems} = useSelector((state) => state.cart)
    const {user} = useSelector((state) => state.profile)

  return (
    <div className='w-full'>
        <div className='flex relative items-center p-5 px-8 justify-between h-[70px] shadow-lg'>
            <div>
                <Link to={'/'}>
                    <img className='h-[60px]' src={Logo} alt='logo'/>
                </Link>
            </div>
            <div className='flex gap-x-5 items-center'>
                {
                    token === null && (
                        <div className='flex gap-2 items-center'>
                            <Link to={'/login'}>
                                <button className='border-2 border-black p-1 rounded-md text-black font-medium'>
                                    Login
                                </button>
                            </Link>
                            <Link to={'/signup'}>
                                <button className='border-2 border-black p-1 rounded-md text-black font-medium'>
                                    SignUp
                                </button>
                            </Link>
                        </div>
                    )
                }
                {
                    user && user?.accountType != ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to={'/dashboard/cart'}>
                            <BsCart fontSize={27}/>
                            {
                                totalItems > 0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropdown/>
                }
                <button onClick={() => setIsNavOpen(isNavOpen ?  false : true)}>
                    <AiOutlineMenu size={25}/>
                </button>
            </div>
        </div>
        {
            isNavOpen && (
                <div className='bg-white z-50 w-full h-full p-5 absolute flex flex-col right-0 gap-4 drop-shadow-lg'>
                    <Link className='p-3 rounded-lg shadow-lg border w-[100%] mx-auto font-medium' onClick={() => setIsNavOpen(false)} to={'/'}><div className='text-center'>Home</div></Link>
                    <Link className='p-3 rounded-lg shadow-lg border w-[100%] mx-auto font-medium' onClick={() => setIsNavOpen(false)} to={'/categories'}><div className='text-center'>Categories</div></Link>
                    <Link className='p-3 rounded-lg shadow-lg border w-[100%] mx-auto font-medium' onClick={() => setIsNavOpen(false)} to={import.meta.env.VITE_MY_PORTFOLIO} target='_blank'><div className='text-center'>About Us</div></Link>
                    <Link className='p-3 rounded-lg shadow-lg border w-[100%] mx-auto font-medium' onClick={() => setIsNavOpen(false)} to={'/contact'}><div className='text-center'>Contact Us</div></Link>
                </div>
            )
        }
    </div>
  )
}

export default NavbarMobile

/*border border-black p-2 rounded-lg font-medium text-white bg-[#002456]*/