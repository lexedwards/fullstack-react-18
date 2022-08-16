import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Homepage</title>
      </Helmet>
      <div>
        <p>Hello world</p>
      </div>
    </>
  );
}
