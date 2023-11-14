import React, { useEffect, useState } from 'react'
import { Link, NavLink, matchPath, useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/K_Logo.png'
import Button from '../Core/HomePage/Button'
import OtherButton from '../Core/HomePage/OtherButton'
import { navbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsCart } from 'react-icons/bs'
import ProfileDropdown from '../Core/Auth/ProfileDropdown'
import { apiConnector } from '../../services/apiConnector'
import { ACCOUNT_TYPE } from '../../utils/constants'


const Navbar = () => {
    const {token} = useSelector((state) => state.auth)
    const {totalItems} = useSelector((state) => state.cart)
    const {user} = useSelector((state) => state.profile)
    
  return (
    <div className='flex w-full mx-auto p-2 shadow-lg sticky top-0 z-50 bg-white bg-opacity-80 h-[70px]'>
        <div className='navbar-homepage max-w-[1280px] w-11/12 flex items-center justify-between mx-auto'>
            <div>
                <Link to={'/'}>
                    <img className='h-[60px]' src={Logo} alt='logo'/>
                </Link>
            </div>
            {/* <nav>
                <ul>
                    {
                        navbarLinks.map((link, index) => {
                            
                        })
                    }
                </ul>
            </nav> */}
            <div className='navbar-items flex flex-row gap-4 drop-shadow-lg'>
                <NavLink to={'/'}><div>Home</div></NavLink>
                <NavLink to={'/categories'}><div>Categories</div></NavLink>
                <NavLink to={import.meta.env.VITE_MY_PORTFOLIO} target='_blank'><div>About</div></NavLink>
                <NavLink to={'/contact'}><div>Contact</div></NavLink>
            </div>
            <div className='flex items-center gap-5'>
                {
                    token === null && (
                        <div className='flex gap-5'>
                            <Link to={'/login'}>
                                <button className='border-2 border-black p-2 px-3 rounded-md text-black font-medium hover:scale-110 transition-all duration-200'>
                                    Login
                                </button>
                            </Link>
                            <Link to={'/signup'}>
                                <button className='border-2 border-black p-2 px-3 rounded-md text-black font-medium hover:scale-110 transition-all duration-200'>
                                    SignUp
                                </button>
                            </Link>
                        </div>
                    )
                }
                {
                    user && user?.accountType != ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to={'/dashboard/cart'}>
                            <div className='flex items-center gap-1'>
                                <BsCart className='' fontSize={27}/>
                                {
                                    totalItems > 0 && (
                                        <p className='border p-1 text-black'>
                                            {totalItems}
                                        </p>
                                    )
                                }
                            </div>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropdown/>
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar