"use client";
import { useState } from "react";
export default function EventObject(){
  const [event, setEvent] = useState<any>(null);
  const handleClick = (e: any) => {
    const v: any = { ...e };
    v.target = e.target.outerHTML;
    delete v.view; delete v.target; // avoid circulars
    setEvent(e);
  };
  return (<div><h2>Event Object</h2>
    <button onClick={(e)=>handleClick(e)} className="btn btn-primary" id="wd-display-event-obj-click">Display Event Object</button>
    <pre>{JSON.stringify(event, null, 2)}</pre>
    <hr/></div>);
}