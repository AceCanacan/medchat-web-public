import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages-css/Input.css';

function CustomButton({ title, onPress, style }) {
  return (
    <button onClick={onPress} className={`buttonContainer ${style}`}>
      {title}
    </button>
  );
}

function InputPage() {
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('');
  const [patterns, setPatterns] = useState('');
  const [medications, setMedications] = useState('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/chatpage', { state: { symptoms, duration, patterns, medications } });
  };

  return (
    <div className='centered-container'> {/* Apply centering styles here */}
      <div className='input-container'>
        <div className='textarea-wrapper'>
        <label className='label'>Symptoms:</label>
        <textarea 
          className='inputBox'
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder='Describe in detail the primary symptom that is concerning you.'
        />

        <label className='label'>Duration:</label>
        <textarea 
          className='inputBox'
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder='How long have you been experiencing this symptom?'
        />

        <label className='label'>Patterns:</label>
        <textarea 
          className='inputBox'
          value={patterns}
          onChange={(e) => setPatterns(e.target.value)}
          placeholder='Have you noticed any patterns or triggers related to your symptoms?'
        />

        <label className='label'>Medications:</label>
        <textarea 
          className='inputBox'
          value={medications}
          onChange={(e) => setMedications(e.target.value)}
          placeholder='Have you tried any treatments or taken any new medications recently, and if so, did they affect your symptom?'
        />
      </div>
      
      <div className='button-centered-container'>
        <CustomButton
          title='SUBMIT'
          onPress={handleSubmit}
          style='submit-button-input'
        />
        </div>
      </div>
    </div>
  );
}

export default InputPage;