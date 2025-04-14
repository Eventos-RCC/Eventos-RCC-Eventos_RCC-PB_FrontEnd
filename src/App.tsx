import './Index.css'
import { RouterProvider } from 'react-router-dom'
import { defaultRoutes } from './routes/Routes'

function App() {

  return (
    <>
      <RouterProvider router={defaultRoutes} />
    </>
  )
}


export default App
