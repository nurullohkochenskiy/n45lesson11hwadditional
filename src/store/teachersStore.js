import create from "zustand";
import axios from "axios";

const findHighestId = (teachers) => {
  let highestId = 0;
  for (const teacher of teachers) {
    if (Number(teacher.id) > highestId) {
      highestId = Number(teacher.id);
    }
  }
  return highestId;
};

export const useTeachersStore = create((set) => ({
  loading: false,
  error: "",
  teachers: JSON.parse(localStorage.getItem("teachers")) || [],
  inpVal: "",
  filtered: [],
  filteredStatus: false,
  foundTeacher: {},

  fetchTeachers: async () => {
    try {
      set({ loading: true });
      const response = await axios.get("http://localhost:3001/teachers");
      set({ loading: false, teachers: response.data });
      localStorage.setItem("teachers", JSON.stringify(response.data));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  getTeacher: (id) =>
    set((state) => ({
      foundTeacher: state.teachers.find((teacher) => teacher.id == Number(id)),
    })),

  createTeacher: ({ firstname, lastname, level, groups }) =>
    set((state) => {
      const { teachers } = state;
      const highestId = findHighestId(teachers);
      const newTeacher = {
        id: String(highestId + 1),
        firstname: firstname,
        lastname: lastname,
        level: level,
        groups: groups,
      };
      const updatedTeachers = [...teachers, newTeacher];
      localStorage.setItem("teachers", JSON.stringify(updatedTeachers));
      return { teachers: updatedTeachers };
    }),

  deleteTeacher: (id) =>
    set((state) => {
      const updatedTeachers = state.teachers.filter(
        (teacher) => teacher.id !== id
      );
      localStorage.setItem("teachers", JSON.stringify(updatedTeachers));
      return { teachers: updatedTeachers };
    }),

  editTeacher: (updatedTeacher) =>
    set((state) => {
      const updatedTeachers = state.teachers.map((teacher) =>
        teacher.id == updatedTeacher.id ? updatedTeacher : teacher
      );
      localStorage.setItem("teachers", JSON.stringify(updatedTeachers));
      return { teachers: updatedTeachers };
    }),

  filterTeacher: ({ search, levelFilt, groupPicker }) =>
    set((state) => {
      if (search.length > 0 || levelFilt.length > 0 || groupPicker.length > 0) {
        const filteredItems = state.teachers.filter((teacher) => {
            const searchingItems = [
              teacher.firstname,
              teacher.lastname,
              teacher.level,
              teacher.groups.join(""),
            ];
            const filteringLevel = teacher.level.toLowerCase();
            const filteringGroups = teacher.groups.map((group) =>
              group.toLowerCase()
            );
  
            let smatches = true;
            let lmatches = true;
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
            //! Level filter
            if (levelFilt) {
              const levelMatches = filteringLevel.includes(
                levelFilt.toLowerCase()
              );
              if (levelMatches) {
                lmatches = true;
              } else {
                lmatches = false;
              }
            }
            //! Group filter
            if (groupPicker) {
              const groupMatches = groupPicker.every((group) =>
                filteringGroups.includes(group.toLowerCase())
              );
              console.log(filteringGroups);
              if (groupMatches) {
                gmatches = true;
              } else {
                gmatches = false;
              }
            }
            let res = true;
            if (smatches == false || lmatches == false || gmatches == false) {
              res = false;
            }
            return res;
          });
        return {
          filteredStatus: true,
          filtered: filteredItems,
        };
      } else {
        return {
          filteredStatus: false,
        };
      }
    }),
}));

export default useTeachersStore;
