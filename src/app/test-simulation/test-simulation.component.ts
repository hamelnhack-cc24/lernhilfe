import { Component } from '@angular/core';

@Component({
  selector: 'app-test-simulation',
  templateUrl: './test-simulation.component.html',
  styleUrl: './test-simulation.component.css',
})
export class TestSimulationComponent {
  questions: any;
  currentQuestion: any;
  // Next question button
  nextQuestionButton = document.getElementById('next-question')!;

  ngOnInit() {
    if (this.nextQuestionButton) {
      this.nextQuestionButton.addEventListener('click', () => {
        const currentIndex = this.questions.indexOf(this.currentQuestion);
        this.showQuestion(currentIndex + 1);
        this.nextQuestionButton.style.display = 'none';
      });
    }

    // Initialize exam
    this.fetchQuestions();
  }

  // Exam functionality
  async fetchQuestions() {
    try {
      const response = await fetch('http://localhost:3000/api/questions');
      this.questions = await response.json();
      this.showQuestion(0);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }

  showQuestion(index: number) {
    if (index >= this.questions.length) {
      document.getElementById('question-container')!.innerHTML =
        '<h3>Prüfung beendet!</h3>';
      return;
    }

    this.currentQuestion = this.questions[index];
    const questionText = document.getElementById('question-text')!;
    const optionsContainer = document.getElementById('options-container')!;
    const feedbackDiv = document.getElementById('feedback')!;

    questionText.innerHTML = `<h3>${this.currentQuestion.question}</h3>`;
    optionsContainer.innerHTML = '';
    feedbackDiv.innerHTML = '';

    this.currentQuestion.options.forEach((option: any, i: any) => {
      const button = document.createElement('button');
      button.className = 'option-button';
      button.textContent = option;
      button.addEventListener('click', () => this.submitAnswer(i));
      optionsContainer.appendChild(button);
    });
  }

  async submitAnswer(answerIndex: number) {
    try {
      const response = await fetch('http://localhost:3000/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: this.currentQuestion.id,
          answer: answerIndex,
        }),
      });

      const result = await response.json();
      const feedbackDiv = document.getElementById('feedback')!;
      feedbackDiv.innerHTML = result.feedback;
      feedbackDiv.className = `feedback ${
        result.correct ? 'correct' : 'incorrect'
      }`;

      document.getElementById('next-question')!.style.display = 'block';
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  }

  // Generate Question functionality
  async generateQuestion(topic: any) {
    try {
      const response = await fetch(
        'http://localhost:3000/api/generate-question',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topic }),
        }
      );

      const questionData = await response.json();
      return questionData;
    } catch (error) {
      console.error('Error generating question:', error);
      return null;
    }
  }
}
