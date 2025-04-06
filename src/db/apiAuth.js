import supabase, { supabaseUrl } from "./supabase";

export async function login({email, password}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if(error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();

  if(!session.session){
    return null;
  }

  if(error) {
    throw new Error(error.message);
  }

  return session.session?.user;
}

export async function signUp({name, email, password, profile_pic}) {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
  const { error: storageError } = await supabase.storage.from("profilepic").upload(fileName, profile_pic);

  if(storageError) {
    throw new Error(storageError.message);
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profilepic/${fileName}`,
      },
    }
  });
  
  if(error) {
    throw new Error(error.message);
  }

  return data;

}