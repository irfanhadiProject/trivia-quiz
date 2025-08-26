import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { decodeHTML } from '../../utils/helper';
import axios from 'axios';

export const fetchQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async ({ amount, category, difficulty }, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
      );

      const questions = response.data.results;

      const textToTranslate = [];
      questions.forEach((q) => {
        textToTranslate.push(decodeHTML(q.question));
        textToTranslate.push(...q.incorrect_answers);
        textToTranslate.push(q.correct_answer);
      });

      const deeplRes = await axios.post('/.netlify/functions/translate', {
        text: textToTranslate,
      });

      const translatedTexts = deeplRes.data;

      let idx = 0;
      const translatedQuestions = questions.map((q) => {
        const translatedQuestion = translatedTexts[idx++];

        const translatedIncorrect = q.incorrect_answers.map(
          () => translatedTexts[idx++]
        );

        const translatedCorrect = translatedTexts[idx++];

        return {
          question: {
            en: q.question,
            id: translatedQuestion,
          },
          incorrect_answers: q.incorrect_answers.map((ans, i) => ({
            en: ans,
            id: translatedIncorrect[i],
          })),
          correct_answer: {
            en: q.correct_answer,
            id: translatedCorrect,
          },
        };
      });

      console.log(translatedQuestions);

      return translatedQuestions;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(
        err.message || 'Gagal mengambil data quiz.'
      );
    }
  }
);

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  currentLanguage: 'id',
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
    toggleLanguage(state) {
      state.currentLanguage = state.currentLanguage === 'id' ? 'en' : 'id';
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
  toggleLanguage,
} = quizSlice.actions;

export default quizSlice.reducer;
