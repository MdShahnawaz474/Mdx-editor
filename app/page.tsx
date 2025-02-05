'use client'
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  
  const [markdown , setMarkdown ]= useState('# Markdown Editor');

  useEffect(()=>{
    const storedMarkDown = localStorage.getItem('MARKDOWN');
    if(storedMarkDown){
      setMarkdown(storedMarkDown)
    }
  },[])
  
  const callBack = (markdown:string)=>{
    setMarkdown(markdown);
    localStorage.setItem('MARKDOWN',markdown);
  }

  return (
    <main className="w-full h-screen grid grid-cols-1 sm:grid-cols-2 bg-gray-800 text-gray-300 ">
      
      <Editor markdown = {markdown} setMarkdown={callBack}/>
      <Preview markdown = {markdown} />  
    </main>
  );
}
