import { useGlobalContext } from "../context/Context";
import { Link } from "react-router-dom";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { navigation, classNames } from '../util';
import { Search } from './reuseable components';
import { useFetch } from "../useFetch";
import "../style.css";


export default function NavBar() {
  const { openSearch, closeSearch, isSearchOpen, user, dispatch, setBlog, page } = useGlobalContext();
  const { data } = useFetch();
  const PF = "http://localhost:3000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  }


  const handleSearch = (e) => {
    if (!e.target.value) return setBlog(data[page]);
    
    const flatten = data.flat();

    const resultsArray = flatten.filter(post => post.title.toLowerCase().startsWith(e.target.value.toLowerCase()) || post.username.toLowerCase().startsWith(e.target.value.toLowerCase()) );

    setBlog(resultsArray)
  }


  return (

    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-16 w-20"
                      src={require("../images/logo.png")}
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.slice(0, 2).map((item, index) => (
                        <Link
                          key={index}
                          to={item.href}
                          className={classNames(
                            'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md 2xl:text-base text-sm font-medium'
                          )}
                    
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                  <Search isSearchOpen={isSearchOpen} handleSearch={handleSearch} openSearch={openSearch} closeSearch={closeSearch} />
                    

                    <div className="hidden md:block">
                      {!user && (
                        <div className="flex items-end">
                          {navigation.slice(3).map((item, index) => {
                            return (
                              <Link
                              key={index}
                              to={item.href} 
                              className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm 2xl:text-base font-medium'
                          )}>{item.name}</Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                    {/* Profile dropdown */}
                    {user && (
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={PF + user.profilePic} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          {/* <List >Logout</List> */}
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item >
                              {({ active }) => (
                                <div>
                                  <Link to='/profile'
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}>
                                    Your Profile
                                  </Link>
                                  <span
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                    onClick={handleLogout}>
                                    Log Out
                                  </span>
                                </div>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    )}
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {navigation.slice(0, 3).map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                {!user && (
                  <>
                    {navigation.slice(3).map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </>
                )}
              </div>
              {user && (
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={PF + user.profilePic} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.username}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    <Search isSearchOpen={isSearchOpen} handleSearch={handleSearch} openSearch={openSearch} closeSearch={closeSearch} />
                    {/* <form className="relative ml-auto" onSubmit={(e) => e.preventDefault()}>
                      {isSearch && (
                        <div>
                          <input type="text" className="rounded-lg bg-neutral-200 outline-none focus:bg-white text-black px-2" placeholder="Search..." onChange={handleSearch} />
                          <button onClick={() => setIsSearch(false)}>
                            <FaWindowClose size={28} fill='red' className="absolute -top-0.5 right-0 rounded-lg" />
                          </button>
                        </div>
                      )}
                    </form>
                    {!isSearch && (
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={() => setIsSearch(true)}>
                        <span className="sr-only">View notifications</span>
                        <FaSearch className="h-6 w-6" aria-hidden="true" />
                      </button>
                    )} */}
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Disclosure.Button
                      as='a'
                      href='/profile'
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Your Profile
                    </Disclosure.Button>
                    <Disclosure.Button
                      as='span'
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      onClick={handleLogout}>
                      Log Out
                    </Disclosure.Button>
                  </div>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>

    // <nav className="bg-neutral-700 ">
    //       <div className="p-6 md:flex md:justify-between md:items-center md:max-w-6xl md:mx-auto md:my-0 nav:text-center">
    //             <div className="flex justify-between items-center">
    //                   <img src={require('../logo.png')} alt="" className="" />
    //                   <Button textColor='white' hide='md:hidden' activeText='slate-400' transition='linear' duration='300' rotate='90'
    //                         handleClick={() => setShowNav(prevNav => !prevNav)}>
    //                         <FaBars size={30} />
    //                   </Button>
    //             </div>
    //             <div className={`h-auto overflow-hidden ${showNav ? 'block' : 'nav:hidden'}`}>
    //                   <ul className='md:flex nav:pt-5 '>

    //                         <List px="4" py="2">
    //                               <Link to="/" >
    //                                     HOME
    //                               </Link>
    //                         </List>

    //                         <List px="4" py="2">
    //                               <Link to="/" >
    //                                     ABOUT
    //                               </Link>
    //                         </List>

    //                         <List px="4" py="2">
    //                               <Link to="/compose" >
    //                                     COMPOSE
    //                               </Link>
    //                         </List>

    //                         {user && (
    //                               <List px="4" py="2" >
    //                                     <form className="relative" onSubmit={(e) => e.preventDefault()}>
    //                                           {isSearch && <input type="text" className="rounded-lg bg-neutral-200 outline-none focus:bg-white text-black pl-2" placeholder="Search" onChange={handleSearch} />}
    //                                           {isSearch && (
    //                                                 <Button handleClick={() => setIsSearch(false)}>
    //                                                       <FaWindowClose size={28} fill="red" className="absolute -top-0.5 right-0 rounded-lg" />
    //                                                 </Button>)}
    //                                     </form>
    //                                     {!isSearch && (
    //                                           <Button handleClick={() => setIsSearch(true)}>
    //                                                 <FaSearch size={18} className="mt-0.5" />
    //                                           </Button>
    //                                     )}
    //                               </List>
    //                         )}


    //                         {user && <List px="4" py="2" handleClick={handleLogout}>LOGOUT</List>}


    //                         {user ? (<List px="4">

    //                               <Link to="/profile">
    //                                     <img className="w-9 h-9 object-cover rounded-full" src={PF + user.profilePic} alt="Profile" />
    //                               </Link>
    //                         </List>
    //                         ) : (
    //                               <>
    //                                     <List px="4" py="2">
    //                                           <Link to="/login" >
    //                                                 LOGIN
    //                                           </Link>
    //                                     </List>

    //                                     <List px="4" py="2">
    //                                           <Link to="/register" >
    //                                                 REGISTER
    //                                           </Link>
    //                                     </List>
    //                               </>
    //                         )}
    //                   </ul>
    //             </div>

    //       </div>

    // </nav>
  );
}        