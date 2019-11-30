import "./styles/main.scss" 

import { h, render, Component } from 'preact';

class App extends Component {
  // Initialise our state. For now we only store the input value
  state = { value: '' }

  onInput = (ev:any) => {
    // This will schedule a state update. Once updated the component
    // will automatically re-render itself.
    this.setState({ value: ev.target.value });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <form>
          <input type="text" value={this.state.value} onInput={this.onInput} />
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
