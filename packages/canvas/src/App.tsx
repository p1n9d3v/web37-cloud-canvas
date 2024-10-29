import { Button } from "@mui/material";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setCount((count) => count + 1)}
      >
        update count
      </Button>

      <h1>{count}</h1>
    </>
  );
}

export default App;
