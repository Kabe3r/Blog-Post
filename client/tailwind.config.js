module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,png}", './public/index.html'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'reg': "url('./images/register-img.jpg')",
        'log': "url('./images/login-img.jpg')",
        'prof': "url('./images/profile-img.jpg')"
      },
      spacing:{
        '82': '23rem',
        '84': '26rem',
        '86' : '28rem',
        '98': '32rem',
        '99': '40rem',
        '100': '60rem',
        '101': '60vh',
        '102': 'calc(100vh - 64px)'
      },
    screens: {
      'minil': {'max' : '1200px'},
      'minism': {'max': '900px' },
      'nav': {'max': '780px'},
      'tablet': {'max': '640px'},
      'm-w': {'max' : '540px'},
      'mobile': {'max': '450px'},
      'm-v': '540px',
      sm: '640px',
      md: '780px',
      lg: '1024px',
      xl: '1280px',
     '2xl': '1536px'
    },
    fontSize : {
     
    },
    fontFamily: {
      'gideon': ['Gideon Roman', 'cursive'],
      'play': ['Playfair Display', 'serif'],
      'lora': ['Lora', 'serif'],
      'corm': ['Cormorant Garamond', 'serif']
    },
    },
  },
  plugins: [],
}
