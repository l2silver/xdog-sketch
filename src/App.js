import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import Header from './components/Header'
import ImagePane from './components/ImagePane'
import SettingsPane from './components/SettingsPane'
import BrowserWarning from './components/BrowserWarning'
import AboutModal from './components/AboutModal'
import Dropzone from 'react-dropzone'
import { readAsDataURL } from 'promise-file-reader'
import { loadNewImage2 } from './actions/imageActions'
import './App.css';
import store from './store'
import UploadPrompt from './components/UploadPrompt';
import axios from 'axios';
import qs from 'querystring';
class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <div className='outer-container'>
          <BrowserWarning />

          <div className="container grid-lg">
            <Header />
            <div>
              <BulkImage />
            </div>
            <div className="columns">
              <ImagePane />
              <SettingsPane />
            </div>
            <AboutModal /> 
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;


const theme = {
  style: {
    transition: 'box-shadow 0.3s ease'
  },
  acceptStyle: {
    boxShadow: '0 0 8px -1px #32b643'
  }
}

let dropzoneRef

class DumbBulkImage extends Component {
  handleDrop = files => {
    // const [image, ...rest] = files // eslint-disable-line no-unused-vars
    console.log('files', files);
    files.reduce((acc, image)=>{
      return acc.then(()=>{
        return readAsDataURL(image).then(dataUrl => {
          return this.props.dispatch(loadNewImage2(dataUrl, image.name)).then((url)=>{
            // console.log('URL', url);
            const config = {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
            const requestBody = {
              base64image: url
            };
            return axios.post('http://localhost:3000/upload/image', qs.stringify(requestBody), config)
              .then((result) => {
                console.log('success');
              })
              .catch((err) => {
                console.log(err)
              })
          })
        });
      });
    }, Promise.resolve());
  }

  browse = () => {
    dropzoneRef && dropzoneRef.open()
  }

  render() {

    return (
      <Dropzone ref={(node) => { dropzoneRef = node }} onDrop={ this.handleDrop } multiple={ true } disableClick={ true } { ...theme }>
        { 
          // React.cloneElement(this.props.children, { browse: this.browse, loading: this.props.loading }) 
        }
        <UploadPrompt browse={this.browse} />
      </Dropzone>
    )
  }
}

const BulkImage = connect(({ image }) => ({ loading: image.loading }))(DumbBulkImage)