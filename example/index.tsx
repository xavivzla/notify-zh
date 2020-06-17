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
              time: 5000,
              icon: {
                el: '<span>ffrf</span>',
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
