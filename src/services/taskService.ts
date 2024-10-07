import { useState } from "react";
import { toast } from "react-toastify";
import { Task } from "../models/Task";
import api from "../config/axios";
import { getCurrentDateTime } from "../assets/hooks/useGetTime";
import { useStateValue } from "../assets/context/stateProdiveder";

export const useTaskService = () => {
  const { data, setData } = useStateValue();
  const [loading, setLoading] = useState(false);

  const handleDone = async (card: Task) => {
    try {
      const newData = { ...card, status: "COMPLETED" };
      console.log(newData);

      const response = await api.put(`task/${card?.id}`, newData);
      console.log(response.data);

      setData((prev: Task[]) =>
        prev.map((task) => (task.id === card.id ? response.data : task))
      );

      toast.success("Task marked as completed!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to mark task as completed.");
    }
  };

  const handleDelete = async (card: Task) => {
    try {
      await api.delete(`task/${card?.id}`);
      setData((prev: Task[]) => prev.filter((task) => task.id !== card.id));
      toast.success("Task deleted!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task.");
    }
  };

  const handleCreateTask = async (
    title: string,
    description: string,
    deadline: string
  ) => {
    if (!title || !description || !deadline) {
      toast.error("Please fill in all the fields before submitting.");
      return;
    }
    setLoading(true); // Start loading
    try {
      const response = await api.post("/task", {
        createdAt: getCurrentDateTime(),
        title,
        description,
        deadline,
        status: "INCOMPLETED",
      });
      setData([...data, response.data]);
      toast.info("Task created successfully!");

      // Reset form fields or perform other necessary operations
    } catch (error) {
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    handleDone,
    handleDelete,
    handleCreateTask,
    setData,
  };
};
