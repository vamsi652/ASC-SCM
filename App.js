import React, { useState } from 'react';
const NameAgeList = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [entries, setEntries] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleAddEntry = () => {
    if (name && age) {
      setEntries([...entries, { name, age }]);
      setName('');
      setAge('');
      
    }
  };

  const handleRemoveEntry = (index) => {
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
  };

  const handleSubmitEntry = () => {
      const newEntries = [...entries];

      const jsonData = JSON.stringify(newEntries);
      console.log(jsonData);
    
  };

  return (
    <div>
      <h2>Add Name and Age</h2>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          Age:
          <input type="text" value={age} onChange={handleAgeChange} />
        </label>
      </div>
      <button onClick={handleAddEntry}>Add</button>
      <button onClick={handleSubmitEntry}>Submit</button>
      <h2>Added Entries</h2>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            <input type="text" value={entry.name}  onChange={(e) =>
                  setEntries((b) => {
                    const a = [...b];
                    a[index].name = e.target.value;
                    return a;
                  })
                }
/>
            <input type="text" value={entry.age} onChange={(e) =>
                  setEntries((b) => {
                    const a = [...b];
                    a[index].age = e.target.value;
                    return a;
                  })
                }/>
            <button onClick={() => handleRemoveEntry(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NameAgeList;
