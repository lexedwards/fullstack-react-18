import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Helmet>
        <title>Homepage</title>
      </Helmet>
      <div>
        <p>Hello world</p>
        <div id='index-counter'>
          <p>Count: {count}</p>
          <button onClick={() => setCount((prev) => prev + 1)}>
            advance count
          </button>
        </div>
      </div>
    </>
  );
}
