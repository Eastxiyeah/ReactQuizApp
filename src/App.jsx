import React from 'react'
import './App.css'

class App extends React.Component {

  state = {
    questions: [
      {
        id: 1,
        title: 'What is HTML used for in web development?',
        answers: [
          {
            text: 'To style webpages',
            correct: false,
          },
          {
            text: 'To add interactivity to webpages',
            correct: false,
          },
          {
            text: 'To structure the content of webpages',
            correct: true,
          },
          {
            text: 'To create database connections',
            correct: false,
          }
        ]
      },
      {
        id: 2,
        title: 'Which of the following is a popular server-side language used in web development?',
        answers: [
          {
            text: 'HTML',
            correct: false,
          },
          {
            text: 'CSS',
            correct: false,
          },
          {
            text: 'XML',
            correct: false,
          },
          {
            text: 'Python',
            correct: true,
          }
        ]
      },
      {
        id: 3,
        title: 'What does CSS stand for in web development?',
        answers: [
          {
            text: 'Computer Security System',
            correct: false,
          },
          {
            text: 'Cascading style Sheets',
            correct: true,
          },
          {
            text: 'Content Streaming Service',
            correct: false,
          },
          {
            text: 'Customer Support System',
            correct: false,
          }
        ]
      },
      {
        id: 4,
        title: 'Which of the following is not a popular front-end framework used in web development?',
        answers: [
          {
            text: 'React',
            correct: false,
          },
          {
            text: 'Vue',
            correct: false,
          },
          {
            text: 'Tailwind CSS',
            correct: false,
          },
          {
            text: 'Ruby on Rails',
            correct: true,
          }
        ]
      },
    ],
    currentQuestionIndex: 0,
    answers: [],
    submitted: false
  }

  componentDidMount() {
    this.setState({
      answers: Array(this.state.questions.length).fill(null)
    })
  }

  prev = () => {
    if (this.state.currentQuestionIndex === 0) return
    this.setState({
      currentQuestionIndex: this.state.currentQuestionIndex - 1
    })
  }

  next = () => {
    if (this.state.currentQuestionIndex === this.state.questions.length - 1) return
    this.setState({
      currentQuestionIndex: this.state.currentQuestionIndex + 1
    })
  }

  selectAnswer = (index) => {
    if(this.state.submitted) return
    const newAnswer = [...this.state.answers]
    newAnswer[this.state.currentQuestionIndex] = index

    this.setState({
      answers: newAnswer
    })
  }

  answerClasses = (index, answered) => {
    let classes;
    if (index === answered) {
      classes = 'bg-slate-400'
    } else {
      classes = 'ba-slate-50 hover:bg-slate-300'
    }

    if(this.state.submitted) {
      const correctIndex = this.state.questions[this.state.currentQuestionIndex].answers.map(answer => answer.correct).indexOf(true)

      if(index === correctIndex) {
        classes = 'bg-green-400'
      }

      if(index === answered && answered !== correctIndex) {
        classes = 'bg-red-400'
      }
    }

    return classes
  }

  answeredCount = () => {
    return this.state.answers.filter(answer => answer !== null).length;
  }

  submit = () => {
    this.setState({
      submitted: true
    })
  }

  score = () => {
    let corrects = 0

    for(let i=0; i<this.state.questions.length; i++) {
      const question = this.state.questions[i].answers
      const answered = this.state.answers[i]

      if(question[answered].correct) {
        corrects ++
      }
    }
    
    return Math.round(corrects / this.state.questions.length * 100)
  }

  render() {
    const question = this.state.questions[this.state.currentQuestionIndex]
    const answered = this.state.answers[this.state.currentQuestionIndex]

    return (
      <div className="min-h-screen p-20 bg-slate-100 flex flex-col items-center">
        <h1 className="text-4xl font-bold">JavaScript Quiz!</h1>

        <div
          className="
      flex
      mt-12
      mb-6
      max-w-3xl
      justify-between
      items-center
      w-full
      text-xl text-slate-700
    "
        >
          <span>第 {this.state.currentQuestionIndex + 1} 題，已回答 {this.answeredCount()} 題，合共 {this.state.questions.length} 題。</span>
          {!this.state.submitted && <button
            className="
        bg-blue-700
        text-white
        px-4
        py-2
        rounded
        shadow
        hover:bg-blue-800
        disabled:opacity-50
      "
            disabled={this.answeredCount() !== this.state.questions.length}
            onClick={this.submit}
          >
            提交
          </button>}
          {this.state.submitted && <strong>Score: {this.score()}/100</strong>}
        </div>

        <div
          className="
      rounded-xl
      overflow-hidden
      block
      w-full
      max-w-3xl
      shadow-xl
      bg-white
    "
        >
          <h2 className="p-6 bg-blue-800 text-white font-bold text-3xl">
            {question.title}
          </h2>
          <ul>
            {
              question.answers.map((answer, index) => (
                <li
                  className={
                    `
          p-6
          border-b-2 border-white
          text-2xl text-slate-700
          cursor-pointer
          ${this.answerClasses(index, answered)}
          `
                  }
                  key={index}
                  onClick={() => this.selectAnswer(index)}
                >
                  {answer.text}
                </li>
              ))
            }
          </ul>
        </div>

        <div className="flex mt-12 mb-6">
          <ul className="flex bg-slate-300 rounded-xl overflow-hidden">
            <li onClick={this.prev} className="hover:bg-slate-400 px-4 py-3 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-4 h-4"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4.5,12a2.3,2.3,0,0,1,.78-1.729L16.432.46a1.847,1.847,0,0,1,2.439,2.773L9.119,11.812a.25.25,0,0,0,0,.376l9.752,8.579a1.847,1.847,0,1,1-2.439,2.773L5.284,13.732A2.31,2.31,0,0,1,4.5,12Z"
                ></path>
              </svg>
            </li>
            <li onClick={this.next} className="hover:bg-slate-400 px-4 py-3 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-4 h-4"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19.5,12a2.3,2.3,0,0,1-.78,1.729L7.568,23.54a1.847,1.847,0,0,1-2.439-2.773l9.752-8.579a.25.25,0,0,0,0-.376L5.129,3.233A1.847,1.847,0,0,1,7.568.46l11.148,9.808A2.31,2.31,0,0,1,19.5,12Z"
                ></path>
              </svg>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default App;