import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import 'react-toastify/dist/ReactToastify.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class BeerMatch extends React.Component {

  constructor() {

    super()
    this.state = {
      beer: {},
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  componentDidMount() {
    axios.get('https://api.punkapi.com/v2/beers/random')
      .then(res => this.setState({ beer: res.data[0] }))
  }




  render() {
    console.log(this.state)
    return (
      <section className="section beer-match">
        <button className="button is-success" onClick={this.openModal}>Beer Match</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          className="containerModalBeer"
        >

          <div className="container">


            <div className="columns">
              <div className="column is-two-thirds">
                <h1 className="titlebeerModal">{`${this.state.beer.name}`}</h1>
                <br/>
                <p>{`${this.state.beer.description}`}</p>
              </div>
              <div className="column is-auto">
                <button className="closeModalbeer" onClick={this.closeModal}><i className="fa fa-times" aria-hidden="true"></i></button>

                <div className="beerbox">
                  <div className="beer">
                    <div className="cup">
                      <div className="liquid"></div>
                      <div className="stripe-1"></div>
                      <div className="stripe-2"></div>
                      <div className="stripe-3"></div>
                    </div>

                    <div className="cup-holder"></div>

                    <div className="foam">
                      <div className="foam-1"></div>
                      <div className="foam-2"></div>
                      <div className="foam-3"></div>
                    </div>
                    <div className="bubbles-1"></div>
                    <div className="bubbles-2"></div>
                    <div className="bubbles-3"></div>
                  </div>
                </div>


              </div>
            </div>
            <hr/>
            <h2 className="subtitlebeer">Other foods to match your meal with</h2>
            <p>{`${this.state.beer.food_pairing}`}</p>
          </div>
        </Modal>


      </section>
    )
  }
}

export default withRouter(BeerMatch)
