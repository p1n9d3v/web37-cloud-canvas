import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        update count
      </button>

      <h1>{count}</h1>
    </>
  );
}

export default App;
