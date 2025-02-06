import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import LogoSection from '../LogoSection'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LogoSection />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout