import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import { Typography } from "@mui/material";
import useAuthStore from "../../store/authStore";
import useTeachersStore from "../../store/teachersStore";
import useStudentsStore from "../../store/studentsStore";
const Main = () => {
  const { user } = useAuthStore();
  const { fetchTeachers } = useTeachersStore();
  const { fetchStudents } = useStudentsStore();
  useEffect(() => {
    fetchTeachers();
    fetchStudents();
  }, []);
  return (
    <Dashboard>
      <Typography variant="h3" mt={10} mx={"auto"}>
        Hello {user.username}
      </Typography>
    </Dashboard>
  );
};

export default Main;
