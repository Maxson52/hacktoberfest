import { supabase } from './supabase';

import { user } from '$lib/stores/stores';

const session = supabase.auth.session();

user.set(session?.user ?? null);

const { data: listener } = supabase.auth.onAuthStateChange(
  async (event, session) => {
    user.set(session?.user ?? null);
  }
);

async function SignUp(email: string, password: string) {
  const { user, session, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  return { user, session, error };
}
async function SignIn(email: string, password: string) {
  const { user, session, error } = await supabase.auth.signIn({
    email: email,
    password: password
  });

  return { user, session, error };
}
async function SignOut() {
  const { error } = await supabase.auth.signOut();

  return error;
}

export { SignUp, SignIn, SignOut };
