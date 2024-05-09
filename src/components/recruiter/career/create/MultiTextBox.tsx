import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { TbPointFilled } from "react-icons/tb";

interface MultiTextBoxProps {
  placeholder: string;
  onDataUpdate: (data: string[]) => void;
  customClassName: string;
}

const MultiTextBox: React.FC<MultiTextBoxProps> = ({ placeholder, onDataUpdate, customClassName }) => {

  const [inputValue, setInputValue] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      setItems(prevItems => [...prevItems, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDeleteItem = (index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  // Notify parent component when data updates
  React.useEffect(() => {
    onDataUpdate(items);
  }, [items, onDataUpdate]);

  return (
    <div className={`space-y-3 container min-h-[100px] max-h-[170px] rounded-md py-2 px-1 relative ${customClassName}`} >
      <div className="items space-y-1">
        {items.map((item, index) => (
          <span key={index} className="flex align-middle items-center justify-between px-2 py-1 bg-[#f5f8fa] border-none rounded-md">
            <div className="flex items-center gap-1 w-11/12">
              <TbPointFilled className="text-sm w-1/12" />
              <div className="text-[#5e5b5b] text-sm w-11/12">{item}</div>
            </div>
            <RxCross2 className="text-xs item-delete w-1/12" onClick={() => handleDeleteItem(index)} />
          </span>
        ))}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        style={{
          border: "none",
          outline: "none",
          background: "none",
        }}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="pl-1 w-full"
      />
    </div>
  );
};

export default MultiTextBox;
