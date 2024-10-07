import "../../components/form/index.scss";
import { ChangeEvent } from "react";

interface InputProps {
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input: React.FC<InputProps> = ({ title, onChange, value }) => {
  return (
    <div>
      <div className="inputbox">
        <input onChange={onChange} value={value} required type="text" />
        <span>{title}</span>
        <i />
      </div>
    </div>
  );
};

export default Input;
