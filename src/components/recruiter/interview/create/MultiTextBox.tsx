import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./MultiTextBox.css"; // Import custom CSS for scrollbar styling

const MultiTextBox: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setItems(prevItems => [...prevItems, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <div className="space-y-3 container">
        <div className="items">
          {items.map((item, index) => (
            <span key={index} className="item">
              <div className="item-content">{item}</div>
              <RxCross2 className="item-delete" />
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="name@gmail.com"
          style={{
          border: "none",
          outline: "none",
          background: "none"}}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="pl-1"
        />
      </div>
    </div>
  );
};

export default MultiTextBox;
