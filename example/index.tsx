import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Notify from '../.';

Notify.config({
  backgrounds: {
    warning: 'yellow',
    error: 'red',
    success: 'blue'
  },
  // width: '100%',
  // maxWidth: '600px'
})

const App = () => {

  return (
    <div>
      <button
        onClick={() =>
          Notify.error({
            message: 'Error',
            option: {
              time: 200000,
              icon: {
                el: `<span 
                  style="width: 20px; 
                  height: 20px;
                  background: #C12A09; 
                  padding: 9px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  box-sizing: border-box;
                  align-items: center">
                      <i>!</i>
                    </span>`
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
