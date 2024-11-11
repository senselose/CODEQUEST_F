import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('http://localhost:8080/api/users', { name, age });
      const response = await axios.post('http://192.168.0.34:8080/api/users', { name, age });
      console.log('User saved:', response.data);
      alert('사용자가 저장되었습니다!');
      setName('');
      setAge('');
      navigate('/board'); // 저장 후 게시판 페이지로 이동
    } catch (error) {
      console.error('Error saving user:', error);
      alert('사용자 저장에 실패했습니다.');
    }
  };

  return (
    <div>
      <h2>사용자 정보 입력</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이름: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>나이: </label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <button type="submit">저장</button>
      </form>
    </div>
  );
}

export default Login;