// Source: https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
export function isValidUrl(urlString) {
  let url;

  try { 
    url =new URL(urlString);
  }
  catch(e){ 
    return false; 
  }
  
  return url.protocol === "http:" || url.protocol === "https:";
}
