import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Handle the "Shorten" button click
  const handleShorten = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');
    setCopied(false);

    try {
      // connecting to your local Node/Express backend
      const response = await axios.post('http://localhost:3000/shorten', {
        headers:{
          "content-type":"application/json"
        },
        // body:JSON.stringify({
        //   originalUrl:longUrl
        // })
        originalUrl:longUrl
      });
      //console.log(response.message);
      // const data=await response.json();
      // const data=response.data;
      // console.log(data);
      setShortUrl(response.data.shortUrl);
      // if(!response.ok){
      //   console.log(response.data.message);
      //   throw new Error(response.data.message)
      // }
      // else{
      //   // Assuming your backend returns { shortUrl: "http://localhost:5000/xyz" }
      // setShortUrl(response.data.shortUrl);
      // }
    } catch (error) {
      //console.log(err);
      console.log("error in client");
      //setError('Something went wrong. Please check the URL or try again.');
      // console.log(response.data.message);
      const errorMessage=error?.response?.data?.message||error?.message||"Something went wrong. Please try again later";
      setError(errorMessage);
      console.log(error);
    } finally {
      setLoading(false);
      setLongUrl(" ");
    }
  };

  // Handle Copy to Clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  setTimeout(() => {setCopied(false);}, 2000); // Reset "Copied!" text after 2s
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>URL Shortener</h1>
        <p className="subtitle">Paste your long link to shorten it</p>

        <form onSubmit={handleShorten} className="input-group">
          <input
            type="url"
            placeholder="https://example.com/very-long-url..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Shortening...' : 'Shorten'}
          </button>
        </form>

        {error && <p className="error-msg">{error}</p>}

        {shortUrl?(
          <div className="result-container">
            <input type="text" value={shortUrl} readOnly />
            <button 
              onClick={handleCopy} 
              className={copied ? 'copy-btn copied' : 'copy-btn'}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        ):null}
      </div>
    </div>
  );
}

export default App;