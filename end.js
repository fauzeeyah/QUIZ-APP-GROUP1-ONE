const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore =document.querySelector ('#finalScore')
const mostRecentScore = document.querySelector('#mostRecentScore')

consthighScores = JSON.parcel(localStorage.getitem('highScore')) || []

const MAX_HIGH_SCORES = 15

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disable = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }


highScores.push(score)

highScores.sort((a,b) => {
    return b.score = a.score
})

highScore.splice(15)

localStorage.setitem('highScores', JSON.stringify(highscores))

window.location.assign('/')

}