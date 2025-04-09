import supabase from "./supabase";

export async function getUrls(...args) {
  const userId = args[1];

  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to load URLs.");
  }

  return data;
}