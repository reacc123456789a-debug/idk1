const mineflayer = require('mineflayer')

const HOST = 'sg-free-1.sryzen.com' // đổi thành IP server thật
const PORT = 25872
const VERSION = '1.20.4'

let botCount = 0 // Số lượng bot đã tham gia

function randomBotName() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  return 'Bot_' + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

function spawnBot() {
  const name = randomBotName()

  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: name,
    version: VERSION
  })

  bot.on('login', () => {
    botCount++
    console.log(`[+] ${name} đã vào server. Tổng số bot: ${botCount}`)
  })

  bot.on('spawn', () => {
    setInterval(() => {
      bot.chat('hết cứu')
    }, 5000)
  })

  bot.on('end', () => {
    console.log(`[-] ${name} đã bị kick hoặc rời server.`)
  })

  bot.on('error', (err) => {
    console.log(`[x] Lỗi ở ${name}: ${err.message}`)
  })
}

// Tạo bot đầu tiên
spawnBot()

// Mỗi 10 giây tạo thêm bot mới
setInterval(spawnBot, 30000)
