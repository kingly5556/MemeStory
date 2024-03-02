import { createClient } from "@/utils/supabase/server";
import React from "react";
import { SubmitButton } from "@/app/login/submit-button";
import { redirect } from "next/navigation";
import { v4 } from "uuid";

export default function page({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const post = async (formData: FormData) => {
    "use server";
    const supabase = createClient();
    const name = formData.get("name") as string;
    const pic = formData.get("pic") as File;
    const filename = v4();
    const publicAttachmentUrl = supabase.storage
        .from("attachments").getPublicUrl(filename);
    const { data, error } = await supabase
      .from("post")
      .insert([{ 
        name,
        pic : publicAttachmentUrl
      }]);
    
    if(error){
      console.log(error)
      return false;
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect("/login");
    }
    const {} = await supabase.storage
      .from("attachments")
      .upload(filename, pic);
    };
  return (
    <div className=" py-20 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
      <label className="text-md" htmlFor="name">
          Meme name
        </label>
      <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="name"
          placeholder="Name of meme"
          required
        />
        <label className="text-md" htmlFor="pic">
          Meme Picture
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="file"
          name="pic"
          required
        />
        <SubmitButton
          formAction={post}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing Up..."
        >
            Upload This Post
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
