export function generateID() {
  let id = ''

  for (let i = 1; i < 24; i++) {
    if (i % 6 === 0) {
      id += '-'
    } else {
      const ramdom = Math.random()
      if (ramdom > 0.5) {
        id += Math.random().toString(36).substring(3, 4)
      } else {
        id += (Math.random() * 10).toString().substring(3, 4)
      }
    }
  }
  return id
}
