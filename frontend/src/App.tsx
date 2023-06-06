import { useState } from 'react'
import Home from './pages/Home'
import Layout from './components/Layout'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <Home />
      </Layout>
      {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
    </>
  )
}

export default App
