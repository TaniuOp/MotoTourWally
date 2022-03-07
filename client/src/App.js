import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import LogRocket from 'logrocket';
import './styles/styles.scss';

LogRocket.init('q4nfr6/mototour');

function App() {
  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <CookiesProvider>
            <Header />
            <Main />
          </CookiesProvider>
        </BrowserRouter>
      </div>
      <div className='Footer'>
        <Footer />
      </div>
    </>
  );
}

export default App;
