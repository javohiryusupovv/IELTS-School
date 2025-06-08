"use client"

import { useEffect, useState } from "react";
import Edit from "./_components/page";

export default function EditParent() {
    const [studentID, setStudentID] = useState<any>(null);

  useEffect(() => {
    const storedID = localStorage.getItem("studentID");
    if (storedID) {
      setStudentID(JSON.parse(storedID));
    }
  }, []);

  const studentInfo = studentID?.student
  
    
  return (
    <div>
      <Edit studentInfo={studentInfo}/>
    </div>
  )
}
