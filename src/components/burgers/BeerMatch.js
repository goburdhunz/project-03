import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
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
      beer: [] ,
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
      .then(res => this.setState({ beer: res.data }))
  }




  render() {
    console.log(this.state)
    return (
      <section className="section beer-match">
        <button className="button is-primary is-danger loginbutton" onClick={this.openModal}>Beer Match</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
        >
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
          <button className="closeModal is-warning" onClick={this.closeModal}>X</button>
          <div className="container">


            <div><span id="beername">{`${this.state.beer.name}`}</span></div>
            <div><span id="beerdescripton">{`${this.state.beer.description}`}</span></div>
            <div><span id="beerfood">{`${this.state.beer.food_pairing}`}</span></div>


          </div>
        </Modal>


      </section>
    )
  }
}

export default withRouter(BeerMatch)
