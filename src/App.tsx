import { BrowserRouter } from 'react-router-dom'
import './global.css'
import { Router } from './Router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './providers/auth';

export function App() {
  return (
    <AuthProvider>
    <div>
      <BrowserRouter>
        <Router />
        <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />
      </BrowserRouter>
    </div>
    </AuthProvider>
  )
}
