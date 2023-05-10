import React, { useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import './main.css';

const options = [
  { value: '', con: 'Wear' },
  { value: 'battle-scarred', con: 'Battle-Scarred' },
  { value: 'well worn', con: 'Well-Worn' },
  { value: 'field-tested', con: 'Field-Tested' },
  { value: 'minimal wear', con: 'Minimal Wear' },
  { value: 'factory new', con: 'Factory New' },
];

const stattrakOptions = [
  { value: undefined, con: 'StatTrak Settings' },
  { value: true, con: 'Only StatTrak' },
  { value: false, con: 'No StatTrak' },
]

export default function Search(props) {
  let [st, setSt] = useState(undefined);
  let [term, setTerm] = useState('');
  let [wear, setWear] = useState('');
  let [loading, setLoading] = useState(false);

  const search = (e) => {
    setLoading(true);
    e.preventDefault();
    const query = `${term} ${wear}${!!st ? '&stattrak=' + st : ''}`;
    fetch('https://api.jf.je/search?name=' + query)
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        props.setResults(json);
        console.log(json);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className='text w-75'>
      <Form onSubmit={(e) => search(e)}>
        <div className='d-flex'>
          <Form.Control
            type='text'
            placeholder='Search'
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>

        <div className='d-flex mt-2 mb-2 justify-content-center'>
          <div>
            <Form.Select size='sm' onChange={(e) => setSt(e.target.value)} placeholder='StatTrak?'>
              {stattrakOptions.map(sto => 
                <option value={sto.value}>{sto.con}</option>)}
            </Form.Select>
          </div>
          <div className='d-flex ml-3'>
            <Form.Select size='sm' onChange={(e) => setWear(e.target.value)} placeholder='Wear'>
              {options.map(condition =>
                <option value={condition.value}>{condition.con}</option>
              )}
            </Form.Select>
          </div>
        </div>
        <div className='w-100 d-flex justify-content-center'>
          {loading ?
            <Spinner />
            :
            <Form.Control
              className='w-25'
              type='submit'
              value='Search 🔎'
            />
          }
        </div>
      </Form>
    </div>
  )
}