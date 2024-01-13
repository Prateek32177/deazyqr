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
        
        <nav  className="translate-x-[-50%] w-10/12 left-1/2 rounded-3xl flex justify-center border  border-foreground/10 h-16 fixed top-5 z-10 backdrop-blur font-mono font-bold">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <Link
      href="/"
className='w-10 md:w-28'
    ><span className='flex items-center'><svg viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, -1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"><rect x="-2.4" y="-2.4" width="20" height="20" rx="14.4" fill="#000000" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 9.75C1.59 9.75 1.25 9.41 1.25 9V6.5C1.25 3.6 3.61 1.25 6.5 1.25H9C9.41 1.25 9.75 1.59 9.75 2C9.75 2.41 9.41 2.75 9 2.75H6.5C4.43 2.75 2.75 4.43 2.75 6.5V9C2.75 9.41 2.41 9.75 2 9.75Z" fill="#ffffff"></path> <path d="M22 9.75C21.59 9.75 21.25 9.41 21.25 9V6.5C21.25 4.43 19.57 2.75 17.5 2.75H15C14.59 2.75 14.25 2.41 14.25 2C14.25 1.59 14.59 1.25 15 1.25H17.5C20.39 1.25 22.75 3.6 22.75 6.5V9C22.75 9.41 22.41 9.75 22 9.75Z" fill="#ffffff"></path> <path d="M17.5 22.75H16C15.59 22.75 15.25 22.41 15.25 22C15.25 21.59 15.59 21.25 16 21.25H17.5C19.57 21.25 21.25 19.57 21.25 17.5V16C21.25 15.59 21.59 15.25 22 15.25C22.41 15.25 22.75 15.59 22.75 16V17.5C22.75 20.4 20.39 22.75 17.5 22.75Z" fill="#ffffff"></path> <path d="M9 22.75H6.5C3.61 22.75 1.25 20.4 1.25 17.5V15C1.25 14.59 1.59 14.25 2 14.25C2.41 14.25 2.75 14.59 2.75 15V17.5C2.75 19.57 4.43 21.25 6.5 21.25H9C9.41 21.25 9.75 21.59 9.75 22C9.75 22.41 9.41 22.75 9 22.75Z" fill="#ffffff"></path> <path d="M8.50109 11.3811C10.0917 11.3811 11.3811 10.0917 11.3811 8.50109C11.3811 6.91051 10.0917 5.62109 8.50109 5.62109C6.91051 5.62109 5.62109 6.91051 5.62109 8.50109C5.62109 10.0917 6.91051 11.3811 8.50109 11.3811Z" fill="#ffffff"></path> <path d="M7.50109 18.3811C8.53939 18.3811 9.38109 17.5394 9.38109 16.5011C9.38109 15.4628 8.53939 14.6211 7.50109 14.6211C6.4628 14.6211 5.62109 15.4628 5.62109 16.5011C5.62109 17.5394 6.4628 18.3811 7.50109 18.3811Z" fill="#ffffff"></path> <path d="M16.5011 9.38109C17.5394 9.38109 18.3811 8.53939 18.3811 7.50109C18.3811 6.4628 17.5394 5.62109 16.5011 5.62109C15.4628 5.62109 14.6211 6.4628 14.6211 7.50109C14.6211 8.53939 15.4628 9.38109 16.5011 9.38109Z" fill="#ffffff"></path> <path d="M15.5011 18.3811C17.0917 18.3811 18.3811 17.0917 18.3811 15.5011C18.3811 13.9105 17.0917 12.6211 15.5011 12.6211C13.9105 12.6211 12.6211 13.9105 12.6211 15.5011C12.6211 17.0917 13.9105 18.3811 15.5011 18.3811Z" fill="#ffffff"></path> </g></svg><span className='px-2 hidden md:inline-flex'>DeazyQR.</span> </span>
    </Link>
          {/* <DeployButton */}
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
      </>
    )
}