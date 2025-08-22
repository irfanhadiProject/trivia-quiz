import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async ({ amount, category, difficulty }, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      return response.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.status === 429
          ? 'Terlalu banyak request. Coba sesaat lagi ya 🙏'
          : 'Gagal mengambil data quiz.'
      );
    }
  }
);

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  userAnswers: [],
  loading: false,
  error: null,
  quizSettings: {
    category: '',
    difficulty: 'medium',
    numberOfQuestions: 10,
  },
  quizFinished: false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizSettings(state, action) {
      state.quizSettings = {
        ...state.quizSettings,
        ...action.payload,
      };
    },
    answerQuestion(state, action) {
      state.userAnswers.push(action.payload);
    },
    nextQuestion(state) {
      const isLast = state.currentQuestionIndex === state.questions.length - 1;
      if (!isLast) {
        state.currentQuestionIndex++;
      } else {
        state.quizFinished = true;
      }
    },
    incrementScore(state) {
      state.score++;
    },
    resetQuiz() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const {
  setQuestions,
  setQuizSettings,
  answerQuestion,
  nextQuestion,
  incrementScore,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
