import './App.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/Search';
import { useState } from 'react';

function App() {
  let [results, setResults] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Buff Search (no login)</h1>
      </header>
      <div className='body mt-3'>
        <Search setResults={setResults} />
      </div>
      <div className='body mt-3'>
        <div className='results'>
          {results.map((result) => {
            const urlImg = result.img;
            const skinName = result.name.split('(')[0];
            const wear = '(' + result.name.split('(')[1];
            const url = result.url;
            return (
              <div className='d-flex align-items-center item'>
                <div className='img'>
                  <img className='img' src={urlImg} alt={skinName} />
                </div>
                <div className='d-flex flex-column w-auto align-items-start'>
                  <h3>{skinName}</h3>
                  {wear}
                  <h4><a href={url}>{url}</a></h4>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='text footer'>
        Created by JF with help from Vinzlr
      </div>
    </div>
  );
}

export default App;
