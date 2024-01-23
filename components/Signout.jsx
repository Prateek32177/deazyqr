
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {SignoutIcon} from "../Icons"
export default async function SignOut(){
    const signOut = async () => {
        'use server'
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        await supabase.auth.signOut()
        return redirect('/login')
      }


    return (<>
    
    <form action={signOut}>
        <button className='flex justify-around items-center' >
          Logout {SignoutIcon}
        </button>
      </form> 
    </>)
}