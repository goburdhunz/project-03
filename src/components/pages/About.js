import React from 'react'


class About extends React.Component {

  render() {
    return (
      <div className="container">
        <header className="title is-1">Meet the team behind BurgerRator!</header>
        <div className="columns is-centered">
          <div className="column is-one-fifth">
            <div className="box card-equal-height">
              <figure className="image">
                <img src="https://i.imgur.com/BDa10tc.jpg" alt="Ania" />
              </figure>
              <h3 className="title is-4 has-text-primary name">Ania</h3>
              <h3 className="title is-4 has-text-primary lastname">Kubow</h3>
              <div className="has-text-centered">
                <a  href="https://github.com/kubowania" className="icon is-medium" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/Y0Mskai.png" alt="GithubLogo"/></a>
                <a  href="https://linkedin.com/in/ania-kubow-77766027/" className="icon is-medium" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/2IsOkIY.png" alt="LinkedLogo"/></a>
              </div>
            </div>
          </div>
          <div className="column is-one-fifth">
            <div className="box card-equal-height">
              <figure className="image">
                <img src="https://i.imgur.com/Nj39OXb.jpg" alt="Camila" />
              </figure>
              <h3 className="title is-4 has-text-primary name">Camila</h3>
              <h3 className="title is-4 has-text-primary lastname">Buenaventura M.</h3>
              <div className="has-text-centered">
                <a  href="https://github.com/Camilabuenamar" className="icon is-medium" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/Y0Mskai.png" alt="GithubLogo"/></a>
                <a  href="www.linkedin.com/in/camilabuenaventuramarquez" className="icon is-medium" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/2IsOkIY.png" alt="LinkedLogo"/></a>
              </div>
            </div>
          </div>
          <div className="column is-one-fifth">
            <div className="box card-equal-height">
              <figure className="image">
                <img src="https://i.imgur.com/w4CPwsr.jpg" alt="Chris" />
              </figure>
              <h3 className="title is-4 has-text-primary name">Chris</h3>
              <h3 className="title is-4 has-text-primary lastname">Beaney</h3>
              <div className="has-text-centered">
                <a  href="https://github.com/ChrisBeaney" className="icon is-medium" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/Y0Mskai.png" alt="GithubLogo"/></a>
                <a  href="https://www.linkedin.com/in/chris-beaney-177571186/" className="icon is-medium" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/2IsOkIY.png" alt="LinkedLogo"/></a>
              </div>
            </div>
          </div>
          <div className="column is-one-fifth">
            <div className="box card-equal-height">
              <figure className="image">
                <img src="https://i.imgur.com/isRtl4D.jpg" alt="Zeeshan" />
              </figure>
              <h3 className="title is-4 has-text-primary name">Zeeshan</h3>
              <h3 className="title is-4 has-text-primary lastname">Goburdhun</h3>
              <div className="has-text-centered">
                <a  href="https://github.com/goburdhunz" className="icon is-medium" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/Y0Mskai.png" alt="GithubLogo"/></a>
                <a  href="https://www.linkedin.com/in/zeeshan-goburdhun/" className="icon is-medium" rel="noopener noreferrer" target="_blank"><img src="https://i.imgur.com/2IsOkIY.png" alt="LinkedLogo"/></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default About
