export default (users) => {
    return users.sort((a,b) => {
        return a.pos - b.pos
    })
}