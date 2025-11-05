import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { UserApp } from './users-app/users/users-app'


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      
    </div>
    
    </p>
  </div>
`
const element = document.querySelector('.card');

UserApp(element);
