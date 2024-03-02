import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React, { useState } from "react";

export default async function ProtectedPage() {
  const supabase = createClient();
  // const [users, setUser] = useState<any>([]);
  // const fetchData = async () => {
  //   let { data, error } = await supabase.from("post").select("*");
  // };
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  
  return <div>meme page</div>;
}
