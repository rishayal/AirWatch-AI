const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
async function request(path, options={}) {
  const response = await fetch(`${API}${path}`, options)
  const data = await response.json().catch(()=>({detail:'Invalid server response'}))
  if (!response.ok) throw new Error(data.detail || 'Request failed')
  return data
}
export const getJSON = path => request(path)
export const postJSON = (path, body) => request(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
