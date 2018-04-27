import React, { Component } from 'react'
import Simditor from 'simditor'
import 'simditor/styles/simditor.scss'

class Editor extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.loadEditor()
  }

  loadEditor() {
    let element = this.refs.textarea
    this.simditor = new Simditor({
      textarea: $(element),
      defaultValue: this.props.placeholder,
      upload: {
        url: '',
        defaultImage: '',
        fileKey: 'upload_file'
      }
    })
    this.bindEditorEvent()

  }

  bindEditorEvent() {
    this.simditor.on('valuechanged', ()=>{
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