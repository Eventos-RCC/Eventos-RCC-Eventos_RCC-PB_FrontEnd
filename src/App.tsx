import './index.css'
import { RouterProvider } from 'react-router-dom'
import { defaultRoutes } from './routes/Routes'
import { Toaster } from 'sonner'

function App() {

  return (
    <>
      <RouterProvider router={defaultRoutes} />
      <Toaster />
    </>
  )
}


export default App
