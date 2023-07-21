import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {answerPlayer, fetchState} from './consts'
function App() {

    const [data, setData] = useState(null)
    const [state, setState] = useState(fetchState.BLANC)
    const [answerUser, setAnswerUser] = useState('')
    const [notice, setNotice] = useState(null)
    const [pointsUser, setPointUser] = useState(0)


    async function fetchRandomQuestion() {
        try {
            setState(fetchState.LOADING)
            const questionData = await axios.get('http://jservice.io//api/random')
            setData(questionData.data)
            setState(fetchState.SUCCESS)
            setNotice(null)
            setAnswerUser('')
        } catch (err) {
            setState(fetchState.ERROR)
        }
    }

    useEffect(() => {
        fetchRandomQuestion()
    }, [])

    function pushAnswer() {
        if (answerUser === data[0].answer) {
            setNotice(answerPlayer.RIGHT_ANSWER)
            setPointUser(prevState => prevState + data[0].value)
        } else {
            setNotice(answerPlayer.WRONG_ANSWER)
        }
    }

    if (state === fetchState.LOADING) {
        return <div>Loading</div>
    }
    console.log(data)

    if (state === fetchState.SUCCESS) {

        return (
            <div className="App">
                <div className='container'>
                    <h1>Get random quiz question!!!</h1>
                    <button onClick={fetchRandomQuestion}>Get</button>
                    <div className='wrapper'>
                        <h2>Current question</h2>
                        <h3>Category - '{data[0].category.title}'</h3>
                        <h3>Points - {data[0].value}</h3>
                        <p>"{data[0].question}"</p>
                        <p>Your answer - '{answerUser}'</p>
                        <p>{notice}</p>
                        <input placeholder='Enter your answer'
                               onChange={e => setAnswerUser(e.target.value)}
                        />
                        <button onClick={pushAnswer}>submit answer</button>
                        <h4>Your score - {pointsUser}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
