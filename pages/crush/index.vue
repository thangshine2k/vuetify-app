<script setup>
import { ref } from 'vue';
import { useHead } from '#imports';

useHead({ title: 'For My Crush 💖' });

const message = ref('Chúc em một ngày thật vui vẻ và hạnh phúc! 💕');
const showHeart = ref(false);
const showQuestions = ref(false);
const selectedQuestion = ref(null);
const selectedAnswer = ref(null);
const specialMessage = ref(null);

const questions = ref([
  { 
    question: 'Em có biết anh thích gì nhất không? 💭', 
    answers: [
      'Anh thích ăn đồ ngọt 🍰',
      'Anh thích chơi game 🎮',
      'Anh thích nhìn thấy nụ cười của em mỗi ngày! 😊'
    ],
    correctIndex: 2,
    special: 'Vì khi em cười, thế giới của anh trở nên rực rỡ hơn! 💖'
  },
  { 
    question: 'Có 3 điều ước, em nghĩ anh sẽ ước gì? ✨', 
    answers: [
      'Anh ước có thật nhiều tiền 💰',
      'Anh chỉ cần một điều ước thôi, đó là em luôn hạnh phúc! 💖',
      'Anh ước được đi du lịch khắp thế giới 🌍'
    ],
    correctIndex: 1,
    special: 'Mỗi ngày anh chỉ muốn thấy em cười thật nhiều! 🥰'
  },
  { 
    question: 'Anh có thể làm gì để khiến em vui? 🎁', 
    answers: [
      'Mua quà tặng em 🎁',
      'Bất cứ điều gì! Miễn là em cười, anh sẵn sàng làm tất cả! 😍',
      'Nấu ăn cho em 🍜'
    ],
    correctIndex: 1,
    special: 'Chỉ cần có em bên cạnh, anh đã thấy hạnh phúc rồi! 💕'
  }
]);

const sendLove = () => {
  showHeart.value = true;
  setTimeout(() => {
    showHeart.value = false;
    showQuestions.value = true;
  }, 0);
};

const revealAnswers = (index) => {
  if (selectedQuestion.value === index) {
    selectedQuestion.value = null;
    selectedAnswer.value = null;
    specialMessage.value = null;
  } else {
    selectedQuestion.value = index;
    selectedAnswer.value = null;
    specialMessage.value = null;
  }
};

const selectAnswer = (qIndex, aIndex) => {
  selectedAnswer.value = aIndex;
  if (aIndex === questions.value[qIndex].correctIndex) {
    specialMessage.value = questions.value[qIndex].special;
  } else {
    specialMessage.value = 'Hmm, em chọn lại thử nhé! 😉';
  }
};
</script>

<template>
  <v-container class="d-flex flex-column justify-center align-center fill-height">
    <v-card class="pa-3 text-center" color="pink lighten-3" elevation="8" width="80%" max-width="350px">
      <v-card-title class="text-h5 font-weight-bold text-white">
        🌸 Hello My Crush 🌸
      </v-card-title>
      <v-card-text class="text-body-2 text-white">
        {{ message }}
      </v-card-text>
      <v-btn color="red darken-2" size="small" @click="sendLove" class="mt-2">
        Gửi Yêu Thương 💝
      </v-btn>
      <transition name="fade">
        <v-icon v-if="showHeart" class="heart-icon mt-2" color="red" size="50">
          mdi-heart
        </v-icon>
      </transition>
    </v-card>

    <v-expand-transition>
      <v-card v-if="showQuestions" class="mt-4 pa-3" color="purple lighten-4" elevation="1" width="80%" max-width="350px">
        <v-card-title class="text-h6 font-weight-bold text-center">Câu hỏi thú vị dành cho em! ✨</v-card-title>
        <v-list class="question-list">
            <v-list-item v-for="(q, qIndex) in questions" :key="qIndex" @click="revealAnswers(qIndex)" class="question-item">
                <v-list-item-title class="text-body-2 font-weight-bold">{{ q.question }}</v-list-item-title>
            <transition name="answer">
              <v-list v-if="selectedQuestion === qIndex" class="answer-list">
                <v-list-item  v-for="(answer, aIndex) in q.answers" :key="aIndex" @click.stop="selectAnswer(qIndex, aIndex)" class="answer-item text-body-2">
                  {{ answer }}
                </v-list-item>
              </v-list>
            </transition>
          </v-list-item>
        </v-list>
        <transition name="special">
          <v-card v-if="specialMessage" class="special-message mt-2 pa-2" color="deep-purple lighten-3" elevation="3">
            <v-card-text class="text-body-2 text-white font-weight-bold text-center">{{ specialMessage }}</v-card-text>
          </v-card>
        </transition>
      </v-card>
    </v-expand-transition>
  </v-container>
</template>


<style scoped>
.heart-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: floatHeart 2s ease-in-out;
}

@keyframes floatHeart {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -60%) scale(1.2);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -70%) scale(1);
    opacity: 0;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.answer-enter-active, .answer-leave-active {
  transition: transform 0.5s ease-out, opacity 0.5s;
}
.answer-enter, .answer-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.special-enter-active, .special-leave-active {
  transition: transform 0.5s ease-out, opacity 0.5s;
}
.special-enter, .special-leave-to {
  transform: scale(0.8);
  opacity: 0;
}

.question-item {
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  background: white;
  margin-bottom: 10px;
  transition: background 0.3s;
  white-space: nowrap;
}

.question-item:hover {
  background: #f8bbd0;
}

.answer-item {
  cursor: pointer;
  padding: 8px;
  border-radius: 5px;
  background: #fff;
  transition: background 0.3s;
  position: relative;
  top: 0;
}
.answer-item:hover {
  background: #ffebee;
}

.special-message {
  border-radius: 10px;
  text-align: center;
  bottom: 16px;
}

.question-list {
  width: 100%;
  overflow: hidden;
}

.v-list-item-title {
    font-size: 10px !important;
    z-index: 100000 !important;
    white-space: nowrap !important;
}

.question-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  display: block;
}

.answer-list {
  max-width: 100%;
  word-wrap: break-word;
  white-space: normal;
  overflow-wrap: break-word;
}

.answer-item {
  word-break: break-word;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}


</style>