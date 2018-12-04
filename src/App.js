import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://nodejs.vpn:4001"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ reservations: data.Reservations }));
  }

  buttonClicked(id, action, event) {
    const socket = socketIOClient(this.state.endpoint);
    //window.alert("Stop clicked");
    socket.emit('buttonClicked', id, action);
  }

  render() {
    const {reservations} = this.state;
    var instanceList;
    if(reservations) {
      instanceList = reservations.map((reservation, index) => {
                       var thisInstance = reservation.Instances[0];
                       var iName = 'Unnamed';
                       var tempName = thisInstance.Tags.find(obj => { return obj.Key === 'Name'; });
                       if(tempName) {
                         iName = tempName.Value;
                       }
                       //console.log(iName);
                       var iState = thisInstance.State.Name;
                       var iId = thisInstance.InstanceId;
                       return (<tr key={iId}>
                         <td>{iName}</td>
                         <td>{iId}</td>
                         <td>{iState}</td>
                         <td><button onClick={(e) => this.buttonClicked(iId, "STOP", e)}>Stop</button>
                             <button onClick={(e) => this.buttonClicked(iId, "START", e)}>Start</button>
                         </td>
                         </tr>
                       );
                     });
    }
    return (
      <div style={{ textAlign: "center" }}>
        {reservations
          ? <table><thead>
             <tr><td>Name</td><td>Id</td><td>State</td><td>Control</td></tr></thead><tbody>
             { instanceList }
            </tbody></table>
          : <p>Loading...</p>
        }
      </div>
    );
  }
}

export default App;
