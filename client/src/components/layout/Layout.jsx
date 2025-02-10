import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <div style={{ backgroundColor: '#f1f8e9' }} className="min-h-screen flex flex-col">
      <Header />
      
      <main  className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout