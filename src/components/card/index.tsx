import { Popconfirm, Tag } from "antd";
import { Task } from "../../models/Task";
import { MdDelete } from "react-icons/md";
import { useTaskService } from "../../services/taskService";
import { IoMdDoneAll } from "react-icons/io";
import { getDifTime } from "../../assets/hooks/useGetTime";
interface CardProps {
  card: Task;
}

function Card({ card }: CardProps) {
  const { handleDone, handleDelete } = useTaskService();
  return (
    <div className="">
      <div
        className={`w-full h-[5px] mt-4 rounded-tr-[2px] rounded-tl-[2px]  ${
          card.status === "COMPLETED" ? "bg-[#6fc243]" : "bg-[#fb6944f7]"
        } `}
      />

      <div className="w-fit rounded-[2px] rounded-tl-[0px] rounded-tr-[0px]  border text-black border-solid bg-white border-white h-fit px-2 py-2 relative ">
        <div className="flex justify-between items-center mt-1 ">
          <Tag>
            <h3>{card?.title}</h3>
          </Tag>
          <Tag>{getDifTime(card?.createdAt)}</Tag>
        </div>
        <div className="w-[160px] ">
          <p className="text-left break-words py-3 px-1">{card?.description}</p>
        </div>
        <div className="flex justify-between items-center gap-3">
          <Tag
            style={{
              backgroundColor:
                card?.status === "COMPLETED" ? "#6fc243" : "#fb6944f7",
              color: "#fff",
            }}
          >
            {card?.status}
          </Tag>

          {card?.status !== "COMPLETED" ? (
            <IoMdDoneAll
              onClick={() => handleDone(card)}
              style={{
                color: "#6fc243",
                cursor: "pointer",
                fontSize: "20px",
              }}
            />
          ) : (
            <Popconfirm
              title="Are You Sure To Delete This Task?"
              onConfirm={() => handleDelete(card)}
            >
              <MdDelete
                style={{
                  color: "#fb6944f7",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              />
            </Popconfirm>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
