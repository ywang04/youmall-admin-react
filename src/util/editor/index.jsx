import React, { Component } from 'react'
import Simditor from 'simditor'
import 'simditor/styles/simditor.scss'
import './index.scss'

class Editor extends Component {
  componentDidMount() {
    this.loadEditor()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.defaultDetail !== nextProps.defaultDetail) {
      this.simditor.setValue(nextProps.defaultDetail)
    }
  }

  loadEditor() {
    let element = this.refs.textarea
    this.simditor = new Simditor({
      textarea: $(element),
      defaultValue: this.props.defaultDetail || 'Please input',
      upload: {
        url: '/manage/product/richtext_img_upload.do',
        defaultImage: '',
        fileKey: 'upload_file'
      }
    })
    this.bindEditorEvent()
  }

  bindEditorEvent() {
    this.simditor.on('valuechanged', () => {
      this.props.onEditorValueChange(this.simditor.getValue())
    })
  }

  render() {
    return (
      <div className="editor">
        <textarea ref="textarea"></textarea>
      </div>
    )
  }
}

export default Editor