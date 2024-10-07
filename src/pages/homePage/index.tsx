/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "../../components/card";
import api from "../../config/axios";
import { useStateValue } from "../../assets/context/stateProdiveder";
import { Task } from "../../models/Task";
import { Empty, Select } from "antd";
function HomePage() {
  const { data, setData } = useStateValue();
  const [filteredData, setFilteredData] = useState<Task[]>(data || []);

  const handleChange = (value: string) => {
    if (value === "ALL") {
      setFilteredData(data || []);
    } else {
      setFilteredData(
        data?.filter(
          (item: Task) => item?.status.toLowerCase() === value.toLowerCase()
        ) || []
      );
    }
  };
  const fetch = async () => {
    try {
      const response = await api.get("/task");
      setData(response.data);
      setFilteredData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch();
  }, [setData]);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  return (
    <div className="mt-6 homePage">
      <div className="flex justify-between ">
        <h1>TodoList</h1>
        <h1 className="mr-40">
          <Select
            defaultValue={"ALL"}
            style={{ width: 150 }}
            onChange={handleChange}
            options={[
              { value: "ALL", label: "ALL" },
              { value: "COMPLETED", label: "COMPLETED" },
              { value: "INCOMPLETED", label: "INCOMPLETED" },
            ]}
          />
        </h1>
      </div>

      <div className="flex justify-around gap-1 flex-wrap mr-5 mt-3">
        <>
          {filteredData?.map((task: Task) => (
            <Card key={task.id} card={task} />
          ))}

          {filteredData?.length === 0 && (
            <div className="flex justify-center items-center h-[70vh]">
              <Empty />
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default HomePage;
