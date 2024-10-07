import {
  CheckOutlined,
  CloseOutlined,
  TagsOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { Task } from "../../models/Task";
import { getDifTime } from "../../assets/hooks/useGetTime";
import { useTaskService } from "../../services/taskService";

interface CardProps {
  card: Task;
}

function Card({ card }: CardProps) {
  const { handleDone, handleDelete } = useTaskService();
  return (
    <div className="w-fit border border-solid border-white rounded-sm h-fit px-7 py-3 relative mt-9 mr-9">
      {card?.status === "INCOMPLETED" && (
        <div className="absolute top-[-10px] right-[-20px] bg-red-500 rounded-sm text-[12px] p-[2px] flex justify-center items-center gap-1">
          <TagsOutlined />
          {card?.status}
        </div>
      )}
      {card?.status === "COMPLETED" && (
        <div
          style={{
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          className="absolute top-[-14px] right-[-20px] rounded-sm text-[12px] p-[3px] flex justify-center items-center gap-1"
        >
          <CheckOutlined className="mb-2" />
          {card?.status}
        </div>
      )}
      {card?.status.toUpperCase() === "INCOMPLETED" ? (
        <div className="absolute top-[-10px] right-[-20px] bg-red-500 rounded-sm text-[12px] p-[2px] flex justify-center items-center gap-1">
          <WarningOutlined />
          {card?.status}
        </div>
      ) : (
        <div
          style={{
            background: "green",
          }}
          className="absolute top-[-10px] right-[-20px] rounded-sm text-[12px] p-[2px] flex justify-center items-center gap-1"
        >
          <TagsOutlined />
          {card?.status}
        </div>
      )}
      <div className="flex justify-between items-center">
        <h3>{card?.title}</h3>
        <h3>{getDifTime(card?.createdAt)}</h3>
      </div>
      <div className="w-[140px]">
        <p className="text-center break-words py-3">{card?.description}</p>
      </div>
      <div className="flex justify-center items-center gap-3">
        {card?.status !== "COMPLETED" ? (
          <Button
            onClick={() => handleDone(card)}
            style={{ background: "green", color: "white" }}
          >
            <CheckOutlined /> Done
          </Button>
        ) : (
          <Popconfirm
            title="Are You Sure To Delete This Task?"
            onConfirm={() => handleDelete(card)}
          >
            <Button style={{ background: "red", color: "white" }}>
              <CloseOutlined /> Delete
            </Button>
          </Popconfirm>
        )}
      </div>
    </div>
  );
}

export default Card;
