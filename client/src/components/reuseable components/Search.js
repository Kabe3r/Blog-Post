import { FaSearch, FaWindowClose } from 'react-icons/fa';

const Search = ({ isSearchOpen, handleSearch, openSearch, closeSearch }) => {

      return (
            <>
            <form className="relative ml-auto" onSubmit={(e) => e.preventDefault()}>
                      {isSearchOpen && (
                        <div>
                          <input type="text" className="rounded-lg bg-neutral-200 outline-none focus:bg-white text-black px-2" placeholder="Search..." onChange={handleSearch} />
                          <button onClick={closeSearch}>
                            <FaWindowClose size={28} fill='red' className="absolute -top-0.5 right-0 rounded-lg" />
                          </button>
                        </div>
                      )}
                    </form>
                    {!isSearchOpen && (
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={openSearch}
                      >
                        <span className="sr-only">View notifications</span>
                        <FaSearch className="h-5 w-5" aria-hidden="true" />
                      </button>
                    )}
            </>
      )
}

export default Search;