import { ReactComponent as Trash } from "../Assets/icons/trash.svg";
import "../Assets/Trash.css";

const TrashButton = () => {
  return (
    <div className="trash-button">
      <Trash className="trash-button__icon" />
    </div>
  );
};

export default TrashButton;
