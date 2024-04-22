import create from "zustand";
import axios from "axios";

const findHighestId = (students) => {
  let highestId = 0;
  for (const student of students) {
    if (Number(student.id) > highestId) {
      highestId = Number(student.id);
    }
  }
  return highestId;
};

export const useStudentsStore = create((set) => ({
  loading: false,
  error: "",
  students: JSON.parse(localStorage.getItem("students")) || [],
  inpVal: "",
  filtered: [],
  filteredStatus: false,
  foundStudent: {},

  fetchStudents: async () => {
    try {
      set({ loading: true });
      const response = await axios.get("http://localhost:3001/students");
      set({ loading: false, students: response.data });
      localStorage.setItem("students", JSON.stringify(response.data));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  getStudent: (id) =>
    set((state) => ({
      foundStudent: state.students.find((student) => student.id == Number(id)),
    })),

  createStudent: ({ firstname, lastname, group }) =>
    set((state) => {
      const { students } = state;
      const highestId = findHighestId(students);
      const newStudent = {
        id: String(highestId + 1),
        firstname,
        lastname,
        group,
      };
      const updatedStudents = [...students, newStudent];
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      return { students: updatedStudents };
    }),

  deleteStudent: (id) =>
    set((state) => {
      const updatedStudents = state.students.filter(
        (student) => student.id !== id
      );
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      return { students: updatedStudents };
    }),

  editStudent: (updatedStudent) =>
    set((state) => {
      const updatedStudents = state.students.map((student) =>
        student.id == updatedStudent.id ? updatedStudent : student
      );
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      return { students: updatedStudents };
    }),

  filterStudent: ({ search, groupFilt }) =>
    set((state) => {
      if (search.length > 0 || groupFilt.length > 0) {
        
        const filteredItems = state.students.filter((student) => {
          const searchingItems = [
            student.firstname,
            student.lastname,
            student.group,
          ];
          const filteringGroup = student.group;

          let smatches = true;
          let gmatches = true;
          //! Search filter
          if (search) {
            const searchMatches = searchingItems.some((item) => {
              return item.toLowerCase().includes(search.toLowerCase());
            });
            if (searchMatches) {
              smatches = true;
            } else {
              smatches = false;
            }
          }
          //! Group filter
          if (groupFilt) {
            const groupMatches = filteringGroup.includes(
              groupFilt.toLowerCase()
            );
            if (groupMatches) {
              gmatches = true;
            } else {
              gmatches = false;
            }
          }
          let res = true;
          if (smatches == false || gmatches == false) {
            res = false;
          }
          return res;
        });
        return { filteredStatus: true, filtered: filteredItems };
      } else {
        return { filteredStatus: false };
      }
    }),
}));

export default useStudentsStore;
