import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Auth from '../../lib/Auth'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import 'react-toastify/dist/ReactToastify.css'

const customStyles = {
  content: {
    width: '25%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      error: '',
      modalIsOpen: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }


  handleChange(e) {
    const formData = {...this.state.formData, [e.target.name]: e.target.value}
    this.setState({ formData, error: ''})
  }


  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/login', this.state.formData)
      .then(res => {
        Auth.setToken(res.data.token)
        this.closeModal()
        this.props.history.push('/burgers')
        toast.success(res.data.message)
      })
      .catch(() => {
        Auth.removeToken()
        this.setState({error: 'Wrong credentials'})
      })
  }

  // componentDidUpdate() {
  //   if(!this.state.modalIsOpen && this.props.location.search === '?auth=true') {
  //     this.setState({ modalIsOpen: true })
  //   }
  // }


  render() {
    return (
      <section className="section login-portal">
        {!Auth.isAuthenticated() && <button className="button is-primary is-danger loginbutton" onClick={this.openModal}>Login</button>}
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
          <button className="closeModal is-warning" onClick={this.closeModal}>☓</button>
          <div className="container">
            <form className="loginform" onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="eg: burger@burgerrator.com"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    placeholder="eg: ••••••••"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.error && <small className="help is-danger">{this.state.error}</small>}
              </div>

              <button className="button is-danger loginsubmit">Submit</button>
            </form>
          </div>
        </Modal>


      </section>
    )
  }
}

export default withRouter(Login)
