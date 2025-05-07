const quizData = [
    {
      question: "Який з цих серіалів є українським?",
      options: ["«Спіймати Кайдаша»", "«Паперовий дім»", "«Друзі»","«Шерлок»"],
      answer: "«Спіймати Кайдаша»"
    },
    {
      question: " Як називається відомий серіал про виживання після апокаліпсису з грибковим вірусом?",
      options: ["«Ходячі мерці»", "«Той, що вижив»", "«Останні з нас»", "«Чорнобиль»"],
      answer: "«Останні з нас»"
    },
    {
      question: "Який серіал українського виробництва зображує життя радянського періоду в Києві?",
      options: ["«Слов’яни»", "«Чорнобиль» (HBO)", "«Київ вдень та вночі»", "«Слуга народу»"],
      answer: "«Слуга народу»"
    },
    {
      question: "Хто зіграв головну роль у фільмі «Титанік»?",
      options: ["Том Круз", "Леонардо Ді Капріо", "Бред Пітт", "Метт Деймон"],
      answer: "Леонардо Ді Капріо"
    },
    {
      question: "Який герой ходить у червоному костюмі?",
      options: ["Тор", "Аквамен", "Людина павук", "Веном"],
      answer: "Людина павук"
    },
    {
      question: "Коли вийшов перший фільм?",
      options: ["1895", "1922", "1964", "1877"],
      answer: "1895"
    },
    {
      question: "Найперший серіал у світі?",
      options: ["Фарэуэй-Хилл", "Зорро", "Ну, погоді!", "Пчелка Майя"],
      answer: "Фарэуэй-Хилл"
    },
    {
      question: "Найпопулярніший серіал у світі?",
      options: ["Гарний лікар", "Дуже дивні справи", "Губка Боб", "Игра престолов"],
      answer: "Игра престолов"
    },
    {
      question: "Який серіал був популярний у 2021?",
      options: ["Основание", "Гра в кальмара", "Людина павук", "Ферма Кларксона"],
      answer: "Гра в кальмара"
    },
    {
      question: "Найпопулярніша платформа для перегляду фільмів?",
      options: ["Netflix", "Megogo", "IVI", "SWEET.TV"],
      answer: "Netflix"
    },
    {
      question: "Коли створили нетфлікс?",
      options: ["2000", "1995", "2009", "1997"],
      answer: "1997"
    },
    {
      question: "Як називається чарівна школа у фільмах про Гаррі Поттера?",
      options: ["«Ілверморні»", "«Дурмстранг»", "Гоґвортс","Бобатон"],
      answer: "Гоґвортс"
    },
    {
      question: "У якому місті відбуваються події фільму «Сам удома»?",
      options: ["Лос-Анджелес", "Чикаго", "Нью-Йорк","Бостон"],
      answer: "Чикаго"
    },
    {
      question: "Який фільм отримав найбільше «Оскарів» в історії?",
      options: ["Титанік", "Володар перснів: Повернення короля", "Бен-Гур","«Шерлок»"],
      answer: "Титанік"
    },
    {
      question: " Який український фільм отримав нагороду на Каннському кінофестивалі?",
      options: ["Мої думки тихі", "Кіборги", "Захар Беркут","Плем’я"],
      answer: "Плем’я"
    },

  ];
  
  
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const nextBtn = document.getElementById('next-btn');
  const questionNumberDisplay = document.getElementById('question-number');
  const scoreDisplay = document.getElementById('score-display');
  const resultContainer = document.getElementById('result-container');
  const finalScoreDisplay = document.getElementById('final-score');
  const resultMessage = document.getElementById('result-message');
  const restartBtn = document.getElementById('restart-btn');
  const explanationDiv = document.getElementById('explanation');
  const explanationText = document.getElementById('explanation-text');
  
  let currentQuestionIndex = 0;
  let score = 0;
  let answered = false;
  
  function loadQuestion() {
    answered = false;
    explanationDiv.style.display = 'none';
    nextBtn.disabled = true;
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    questionNumberDisplay.textContent = `${currentQuestionIndex + 1}/${quizData.length}`;
    optionsContainer.innerHTML = '';
  
    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.classList.add('option');
      button.addEventListener('click', () => checkAnswer(option));
      optionsContainer.appendChild(button);
    });
  }
  
  function checkAnswer(selectedOption) {
    if (answered) return;
    answered = true;
    const currentQuestion = quizData[currentQuestionIndex];
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach(optionBtn => {
      if (optionBtn.textContent === currentQuestion.answer) {
        optionBtn.style.backgroundColor = 'lightgreen';
      }
      if (optionBtn.textContent === selectedOption && selectedOption !== currentQuestion.answer) {
        optionBtn.style.backgroundColor = 'lightcoral';
      }
      optionBtn.disabled = true;
    });
  
    if (selectedOption === currentQuestion.answer) {
      score++;
      scoreDisplay.textContent = `балів: ${score}`;
      explanationText.textContent = "Правильно!";
    } else {
      explanationText.textContent = `Неправильно. Правильна відповідь: ${currentQuestion.answer}`;
    }
    explanationDiv.style.display = 'block';
    nextBtn.disabled = false;
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }
  
  function showResults() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    finalScoreDisplay.textContent = `${score}/${quizData.length}`;
    if (score >= quizData.length * 0.8) {
      resultMessage.textContent = "Чудово! Ви відмінно знаєте матеріал!";
    } else if (score >= quizData.length * 0.5) {
      resultMessage.textContent = "Непогано! Але є ще куди рости.";
    } else {
      resultMessage.textContent = "Варто ще трохи повчити.";
    }
  }
  
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = ` ${score}`;
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'flex';
    loadQuestion();
  }
  
  nextBtn.addEventListener('click', nextQuestion);
  restartBtn.addEventListener('click', restartQuiz);
  
  loadQuestion();

  function showResults() {
    // Зберігаємо результат у localStorage, щоб передати на іншу сторінку
    localStorage.setItem('finalScore', `${score}/${quizData.length}`);
    
    // Переходимо на сторінку з результатами
    window.location.href = 'results.html';
  }

  function toggleTable() {
    const table = document.getElementById("myTable");
    if (table.style.display === "none") {
      table.style.display = "table";
    } else {
      table.style.display = "none";
    }
  }
window.addEventListener('DOMContentLoaded', () => {
        const resultText = document.getElementById('final-score');
        const message = document.getElementById('result-message');
      
        const score = localStorage.getItem('finalScore');
      
        if (score) {
          resultText.textContent = score;
          const [correct, total] = score.split('/').map(Number);
      
          if (correct >= total * 0.8) {
            message.textContent = "Чудово! Ви відмінно знаєте матеріал!";
          } else if (correct >= total * 0.5) {
            message.textContent = "Непогано! Але є ще куди рости.";
          } else {
            message.textContent = "Варто ще трохи повчити.";
          }
        }
      });

  

  
