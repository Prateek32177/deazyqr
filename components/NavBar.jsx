import { cookies } from 'next/headers'
import AuthButton from '../components/AuthButton'
import DeployButton from '../components/DeployButton'
import { createClient } from '@/utils/supabase/server'
import Link from "next/link";

export default function NavBar(){
    const cookieStore = cookies()

    const canInitSupabaseClient = () => {
      // This function is just for the interactive tutorial.
      // Feel free to remove it once you have Supabase connected.
      try {
        createClient(cookieStore)
        return true
      } catch (e) {
        return false
      }
    }
  
    const isSupabaseConnected = canInitSupabaseClient()

    return(
        <>
        
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 sticky top-0 z-10 backdrop-blur font-mono font-bold">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <Link
      href="/"

    > DeazyQR.
    </Link>
          {/* <DeployButton */}
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      </>
    )
}