import React, {Component} from "react"

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleGenerateButton = this.handleGenerateButton.bind(this);
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(res => {
                const {memes} = res.data;
                this.setState({
                    allMemeImgs: memes
                })
            })

    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleGenerateButton(e) {
        e.preventDefault();
        const randomNumber = Math.floor(Math.random() * this.state.allMemeImgs.length);
        const randomMemeImage = this.state.allMemeImgs[randomNumber].url;
        this.setState({
            randomImg: randomMemeImage
        })
    }

    render() {

        return ( 
            <div>
            <form className = "form" >
            <input 
            type = "text"
            name = "topText"
            placeholder = "top text"
            value = {this.state.topText}
            onChange = {this.handleChange}
            />

            <input 
            type = "text"
            name = "bottomText"
            placeholder = "bottom text"
            value = {this.state.bottomText}
            onChange = {this.handleChange}
            />

            <button onClick = {this.handleGenerateButton} > Gen </button>

            </form>

            <div className ="meme">
            <img src={this.state.randomImg} alt="randomimage"/>
            <h2 className ="top" > {this.state.topText} </h2> 
            <h2 className = "bottom" > {this.state.bottomText} </h2> 
            </div> 
            </div>
        )
    }
}

export default MemeGenerator