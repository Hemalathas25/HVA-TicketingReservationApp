import React from 'react'
import './nav.css'
import {GiBus  } from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {TbGridDots} from 'react-icons/tb'

const Navbar = () => {
  return (
    <section className='navBarSection'> 
      <div className='header'>

        <div className='logoDiv'>
          <a href='#' className='logo'>
            <h1 className='flex'><GiBus  className="icon" />HVA Express</h1>
          </a>
        </div>

      
        <div className='navBar'>
          <ul className='navLists flex'>
            <li className='navItem'>
              <a href='#' className='navLink'>Home</a>
            </li>

          <div className='headerbtns flex'>
            <button className='btn loginBtn'>
              <a href='#'>Login</a>
            </button>
            <button className='btn loginBtn'>
              <a href='#'>Sign Up</a>
            </button>
          </div>

          </ul>
          <div className='closeNavbar'>
            <AiFillCloseCircle className="icon"/>
          </div>
        </div>

        <div className='toggleNavbar'>
          <TbGridDots className="icon" />
        </div>
      </div>
    </section>
  )
}

export default Navbar
