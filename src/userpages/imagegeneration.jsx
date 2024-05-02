import React, { useState } from 'react';

function Genimg() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = () => {
    fetch('https://api.openai.com/v1/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-proj-2QwmWbmCZYv5haTlrLUsT3BlbkFJguolw77XfPUQkUIO43Fe', // Replace with your OpenAI API key
      },
      body: JSON.stringify({
        prompt: prompt,
        model: "image-davinci-002",
        output_format: "image"
      })
    })
    .then(response => response.json())
    .then(data => setGeneratedImage(data.url))
    .catch(error => console.error('Error generating image:', error));
  };

  return (
    <div>
      <h1>Generate Image from Prompt</h1>
      <div>
        <label htmlFor="prompt">Prompt:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={handlePromptChange}
        />
      </div>
      <button onClick={handleSubmit}>Generate Image</button>
      {generatedImage && (
        <div>
          <h2>Generated Image:</h2>
          <img src={generatedImage} alt="Generated" />
        </div>
      )}
    </div>
  );
}

export default Genimg;
