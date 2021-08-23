import React, { useState, Suspense, useEffect } from 'react';

import Header from '../Header';
import Loading from '../Loading';
import Person from '../Person';

//const Person = React.lazy(() => import('../Person'));
const Planet = React.lazy(() => import('../Planet'));
const Starship = React.lazy(() => import('../Starship'));
const FlashMessage = React.lazy(() => import('../FlashMessage'));

const shortId = require('short-id');

function App() {
  const getInitialSection = () => {
    if (window.location.hash) {
      return window.location.hash.substr(1);
    }
    return 'person';
  };

  const [active, setActive] = useState(getInitialSection());

  const [message, setMessage] = useState([
    //{
    //id: 1,
    //type: 'danger',
    //text: 'Adipisicing cum numquam quia id accusantium facere!',
    //},
    //{
    //id: 2,
    //type: 'success',
    //text: 'Adipisicing cum numquam quia id accusantium facere!',
    //},
    //{
    //id: 3,
    //type: 'info',
    //text: 'Adipisicing cum numquam quia id accusantium facere!',
    //},
    //{
    //id: 4,
    //type: 'warning',
    //text: 'Adipisicing cum numquam quia id accusantium facere!',
    //},
  ]);

  const handleClick = param => {
    setActive(param);
  };

  const handleAddMessage = current => {
    setMessage([...message, { ...current, id: shortId.generate() }]);
  };

  const handleClearMessages = current => {
    setMessage([]);
  };

  const handleDeleteMessage = id => {
    setMessage(message.filter(item => item.id !== id));
  };

  useEffect(() => {
    switch (active) {
      case 'person':
        document.title = 'Characters';
        break;
      case 'planet':
        document.title = 'Planets';
        break;
      case 'starship':
        document.title = 'Starship';
        break;
      default:
        document.title = 'Star Wars';
    }
  }, [active]);

  return (
    <div className="App font-mono">
      <header className="App-header">
        <Header active={active} handleClick={handleClick} />
      </header>
      <div className="max-w-sm mx-auto mt-10">
        {message &&
          message.map(item => (
            <Suspense key={item.id} fallback={<Loading />}>
              <FlashMessage
                message={item}
                handleDeleteMessage={handleDeleteMessage}
              />
            </Suspense>
          ))}
        {active === 'person' && (
          <Suspense fallback={<Loading />}>
            <Person
              handleClearMessages={handleClearMessages}
              handleAddMessage={handleAddMessage}
            />
          </Suspense>
        )}
        {active === 'planet' && (
          <Suspense fallback={<Loading />}>
            <Planet
              handleClearMessages={handleClearMessages}
              handleAddMessage={handleAddMessage}
            />
          </Suspense>
        )}
        {active === 'starship' && (
          <Suspense fallback={<Loading />}>
            <Starship
              handleClearMessages={handleClearMessages}
              handleAddMessage={handleAddMessage}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default App;
