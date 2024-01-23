"use client"
import React, { useState, useEffect } from 'react'


// // Access your API key as an environment variable (see "Set up your API key" above)
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI('AIzaSyA1_HyCycvJGbC3e6oMf34Rku_g3SvlKJs');
// const env = require('dotenv')
// async function run() {
//   // For text-only input, use the gemini-pro model
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//   const prompt = "Write a story about a magic backpack."

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();
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
