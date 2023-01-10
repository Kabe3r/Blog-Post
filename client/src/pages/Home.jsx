import { useEffect } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { Header, Post } from "../components";
import { Button, Loading} from "../components/reuseable components";
import { useGlobalContext } from '../context/Context';
import { useFetch } from '../useFetch';

export default function Home() {
  const { handlePage, blog, setBlog, page, setPage } = useGlobalContext();
  const { loading, data } = useFetch();

  
  
  useEffect(() => {
    if (!loading) { 
      setBlog(data[page]);
    }
  }, [loading, data, page, setBlog]);
  
  if (loading) {
    return (
      <Loading />
      ) 
  }

  return (
    <main>
    <header>
    <Header />
    </header>
        <section>
          <div className="grid justify-center justify-items-center">
            {blog ? (
            blog.map((post, d) => (
              <Post key={post._id} {...post} />
            ))
            ) : null
            }
          </div>
          {!loading && (
            <div className="h-80 flex flex-wrap justify-center items-center">
              <Button hoverColor="hover:bg-gray-800 hover:text-white" border="border" textColor="gray-400" py="2" px="4" borderColor="gray-300" handleClick={() => setPage(prevIndex => prevIndex === 0 ? prevIndex + (data.length - 1) : prevIndex - 1)}>
              <FaAngleLeft size={25}/>
              </Button>              
              {data.map((item, index) => {
                return (
                  <Button key={index} border="border" mx="md:mx-4" py="2" px="4"  textColor={`${page === index ? 'white' : 'gray-400'}`} bg={`${page === index && 'bg-blue-400'}`}  borderColor="gray-300" text="md:text-lg text-sm"
                  handleClick={() => handlePage(index)}
                  >{index + 1}</Button>     
                )})}
                <Button hoverColor="hover:bg-gray-800 hover:text-white" border="border" textColor="gray-400" py="2" px="4" borderColor="gray-300" 
                handleClick={() => setPage(nextInd => nextInd >= (data.length - 1) ?  0: nextInd + 1)}>
                <FaAngleRight size={25} />
                 </Button>
            </div>
          )}
        </section>
    </main>
  )
}

