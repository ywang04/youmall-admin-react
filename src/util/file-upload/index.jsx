import React, { Component } from 'react'
import FileUpload from './file-upload.jsx'

class FileUploader extends Component {
  render() {
    const options = {
      baseUrl: '/manage/product/upload.do',
      fileFieldName: 'upload_file',
      chooseAndUpload: true,
      dataType: 'json',
      uploadSuccess: (res) => {
        this.props.onSuccessUpload(res.data)
      },
      uploadError: () => {
        this.props.onFailUpload('Upload Failed. Please try again later.')
      }
    }

    return (
      <FileUpload options={options} >
        <button className="bt btn-default" ref="chooseAndUpload">Choose</button>
      </FileUpload>
    )
  }
}

export default FileUploader
