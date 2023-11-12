import React from 'react';

const Tab = ({ tabData, field, setField }) => {
  return (
    <div className="flex relative">
      <select
        className="py-2 px-4 font-medium border rounded-lg drop-shadow-lg"
        value={field}
        required
        onChange={(e) => setField(e.target.value)}
      >
        <option value="" disabled>
          Select Account Type
        </option>
        {tabData.map((tab) => (
          <option key={tab.id} value={tab.type}>
            {tab.tabName}
          </option>
        ))}
      </select>
      
    </div>
  );
};

export default Tab;