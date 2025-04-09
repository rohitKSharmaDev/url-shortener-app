import supabase from "./supabase";

export async function getClicksForUrls(...args) {
  const urlIds = args[1]

  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to load Clicks.");
  }

  return data;
}