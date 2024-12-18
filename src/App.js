import React, {useState} from 'react';
import './App.css'
import axios from 'axios'

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }
  const [response, setResponse] = useState('');
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/TEST/backend/recieve.php', formData);

      // Handle the response
      setResponse(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred while sending data');
    }
  }
  return (
    <div className='application'>
      <h2>Send Data to PHP Backend</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" name='name' value={formData.name} onChange={handleChange}/>
        </div>
        <div>
          <label>Email: </label>
          <input type="email" name='email' value={formData.email} onChange={handleChange}/>
        </div>
        <button type='submit'>Submit</button>
      </form>
      {response && <p>Response: {response}</p>}
    </div>
  )
}

export default App
