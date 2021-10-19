/**
 * <HeaderBar />
 */

import React from "react";

export default class HeaderBar extends React.Component {
  render() {
    return (
      <div className="toolbar-header">
        <span className="badge badge-secondary">{this.props.data.text}</span>
        <div className="toolbar-header-buttons">
          {this.props.data.element !== "LineBreak" && (
            <div
              className="btn is-isolated"
              onClick={this.props.editModeOn.bind(
                this.props.parent,
                this.props.data
              )}
            >
              <i className="is-isolated far fa-edit"></i>
            </div>
          )}
          <div
            className="btn is-isolated"
            onClick={this.props.onDestroy.bind(this, this.props.data)}
          >
            <i className="is-isolated far fa-trash-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}
