"use client"
import React, { useState, useEffect } from 'react'

export default function Home() {
  const [response, setResponse] = useState("Loading")

  useEffect(() => {
    fetch(`http://localhost:8080/chatbot`).then(
      res => res.json()
    ).then(
      res => {
        setResponse(res.message);
        console.log(res.message);
      }
    )
  }, [])
  return (
    <div>{response}</div>
  );
}
