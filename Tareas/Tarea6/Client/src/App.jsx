import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
function App() {
  const style_font = {
    fontFamily: "'Manrope', sans-serif",
  };
  const [data, setData] = useState([])
  useEffect(() => {
    const socket = io('http://localhost:4000')

    socket.emit('getAlbumes')

    socket.on('albumes', (newdata) => {
      console.log(newdata)
      setData(newdata)
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  return (
    <div className='h-screen bg-cover bg-center bg-negro-claro'>
      <div>
        <h1 className='text-center text-white text-4xl'style={style_font}>Tarea 6</h1>
      </div>
      <div className="mx-auto max-w-4xl p-3 bg-gray-100 rounded-md shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-500 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-3 bg-gray-500 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                Album
              </th>
              <th className="px-6 py-3 bg-gray-500 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                Artist
              </th>
              <th className="px-6 py-3 bg-gray-500 text-left text-xs leading-4 font-medium text-black uppercase tracking-wider">
                Year
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-300 divide-y divide-gray-200">
            {data.map((album, i) =>(
              <tr key={i}>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {i+1}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {album.album}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {album.artist}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {album.year}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
