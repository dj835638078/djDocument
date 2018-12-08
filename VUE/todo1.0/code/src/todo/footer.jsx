import "../assets/styles/footer.styl"

export default {
    data() {
        return {
            author: "Dj"
        }
    },
    render() {
        return (
            <div id = "footer" >
                <span>Wrriten by {this.author}</span>
            </div>
        )
}
}