import React, { Component} from 'react'

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    // this.show();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visiable !== this.props.visiable) {
      nextProps.visiable ? this.show() : this.close();
    }
  }

  close = (e) => {
    document.body.removeChild(this.refs.modal);
  }

  show() {
    document.body.append(this.refs.modal);
  }
  
  render() {
    return (
      <div ref="modal" className="modal"  >
        <div className="modal-mask" onClick={this.close}></div>
        <div className="modal-main">sdfsdfsdf</div>
      </div>
    ) 
  }
}