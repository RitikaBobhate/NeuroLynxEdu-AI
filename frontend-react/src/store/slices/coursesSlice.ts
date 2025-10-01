import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
}

interface CoursesState {
  courses: Course[];
  loading: boolean;
  currentCourse: Course | null;
}

const initialState: CoursesState = {
  courses: [],
  loading: false,
  currentCourse: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    setCurrentCourse: (state, action: PayloadAction<Course>) => {
      state.currentCourse = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCourses, setCurrentCourse, setLoading } = coursesSlice.actions;
export default coursesSlice.reducer;