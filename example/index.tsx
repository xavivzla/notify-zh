import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Notify from '../.';

const App = () => {

  // React.useEffect(() => {
  //   Notify.success("Load Component Success", { time: 5000 })
  // }, [])

  return (
    <div>
      <button
        onClick={() =>
          Notify.success({
            message: "Click Success",
            option: {
              time: 50000,
              icon: {
                el: `<span>
                  <img style="max-width: 20px; display: block" src="https://media.istockphoto.com/vectors/info-icon-stock-vector-illustration-flat-design-vector-id611313138" /> 
                </span>`,
                position: 'left'
              }
            }
          })
        }
      >
        Success
      </button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
