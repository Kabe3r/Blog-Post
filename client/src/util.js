export const paginate = (posts) => {
      const postsPerPage = 5;
      const numberOfPages = Math.ceil(posts.length / postsPerPage);
    
      const newPosts = Array.from({ length: numberOfPages }, (_, index) => {
        const start = index * postsPerPage
        return posts.slice(start, start + postsPerPage)
      })
    
      return newPosts;
    }
    
export const navigation = [
      {name: 'Home', href: '/'},
      {name: 'Compose', href: '/compose'},
      {name: 'Login', href: '/login'},
      {name: 'Register', href: '/register'},
    ]
    
    
export const classNames = (...classes) => {
      return classes.filter(Boolean).join(' ');
    }
    