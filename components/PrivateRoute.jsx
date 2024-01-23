import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const PrivateRoute = async ({ children }) => {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)



  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    // Redirect to login page if not authenticated
    redirect("/login?message=Could not authenticate user");
    return null;
  }

  return children;
};

export default PrivateRoute;
