import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import LoadingDisplay from "./LoadingDisplay";

class App extends React.Component {
  state = { lat: null, errorMsg: ''}

  componentDidMount() {
      window.navigator.geolocation.getCurrentPosition(
          (position) => {
              //To update object we called setState
              this.setState({ lat: position.coords.latitude })
          },
          (err) => {
              this.setState({ errorMsg: err.message })
          }
      );
  }

  componentDidUpdate() {
  }

  renderContent(){
      if(this.state.errorMsg && !this.state.lat){
          return <div>Error: {this.state.errorMsg}</div>
      }
      if (!this.state.errorMsg && this.state.lat){
          return <SeasonDisplay lat={this.state.lat} />
      }

      return <LoadingDisplay message={"Please Accept Location Request"}/>
  }

  //Render has to be defined!
  render(){
      return(
          <div>
              {this.renderContent()}
          </div>
      )
  }

}

ReactDOM.render(<App/>, document.querySelector("#root"));