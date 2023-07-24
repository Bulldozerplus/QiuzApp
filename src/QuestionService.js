import axios from "axios";

export default class QuestionService {
    static async getAll() {
        const questionData = await axios.get('http://jservice.io//api/random')
        return questionData.data
    }
}