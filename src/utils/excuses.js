const url = 'https://gist.githubusercontent.com/AndrewBrinker/6763cdd5d79d6e3eaa3f' +
            '/raw/624b946ebcca71ac76b74afa5ea41280540c1b97/excuses.txt'

const excuse = fetch(url)
  .then(response => response.text())
  .then(text => {
    const lines = text.split('\n')
    const i = Math.round(Math.random() * Math.floor(lines.length - 1))
    return lines[i]
  })

export default excuse
