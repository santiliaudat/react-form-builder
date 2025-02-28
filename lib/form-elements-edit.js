"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactTextareaAutosize = _interopRequireDefault(require("react-textarea-autosize"));

var _draftJs = require("draft-js");

var _draftjsToHtml = _interopRequireDefault(require("draftjs-to-html"));

var _reactDraftWysiwyg = require("react-draft-wysiwyg");

var _dynamicOptionList = _interopRequireDefault(require("./dynamic-option-list"));

var _requests = require("./stores/requests");

var _UUID = _interopRequireDefault(require("./UUID"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var toolbar = {
  options: ["inline", "list", "textAlign", "fontSize", "link", "history"],
  inline: {
    inDropdown: false,
    className: undefined,
    options: ["bold", "italic", "underline", "superscript", "subscript"]
  }
};

var FormElementsEdit = /*#__PURE__*/function (_React$Component) {
  _inherits(FormElementsEdit, _React$Component);

  var _super = _createSuper(FormElementsEdit);

  function FormElementsEdit(props) {
    var _this;

    _classCallCheck(this, FormElementsEdit);

    _this = _super.call(this, props);
    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false
    };
    return _this;
  }

  _createClass(FormElementsEdit, [{
    key: "toggleRequired",
    value: function toggleRequired() {// const this_element = this.state.element;
    }
  }, {
    key: "editElementProp",
    value: function editElementProp(elemProperty, targProperty, e) {
      var _this2 = this;

      // elemProperty could be content or label
      // targProperty could be value or checked
      var this_element = this.state.element;
      this_element[elemProperty] = e.target[targProperty];
      this.setState({
        element: this_element,
        dirty: true
      }, function () {
        if (targProperty === "checked") {
          _this2.updateElement();
        }
      });
    }
  }, {
    key: "onEditorStateChange",
    value: function onEditorStateChange(index, property, editorContent) {
      // const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>');
      var html = (0, _draftjsToHtml["default"])((0, _draftJs.convertToRaw)(editorContent.getCurrentContent())).replace(/<p>/g, "").replace(/<\/p>/g, "").replace(/&nbsp;/g, " ").replace(/(?:\r\n|\r|\n)/g, " ");
      var this_element = this.state.element;
      this_element[property] = html;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "updateElement",
    value: function updateElement() {
      var this_element = this.state.element; // to prevent ajax calls with no change

      if (this.state.dirty) {
        this.props.updateElement.call(this.props.preview, this_element);
        this.setState({
          dirty: false
        });
      }
    }
  }, {
    key: "convertFromHTML",
    value: function convertFromHTML(content) {
      var newContent = (0, _draftJs.convertFromHTML)(content);

      if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
        // to prevent crash when no contents in editor
        return _draftJs.EditorState.createEmpty();
      }

      var contentState = _draftJs.ContentState.createFromBlockArray(newContent);

      return _draftJs.EditorState.createWithContent(contentState);
    }
  }, {
    key: "addOptions",
    value: function addOptions() {
      var _this3 = this;

      var optionsApiUrl = document.getElementById("optionsApiUrl").value;

      if (optionsApiUrl) {
        (0, _requests.get)(optionsApiUrl).then(function (data) {
          _this3.props.element.options = [];
          var options = _this3.props.element.options;
          data.forEach(function (x) {
            // eslint-disable-next-line no-param-reassign
            x.key = _UUID["default"].uuid();
            options.push(x);
          });
          var this_element = _this3.state.element;

          _this3.setState({
            element: this_element,
            dirty: true
          });
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.dirty) {
        this.props.element.dirty = true;
      }

      var this_checked = this.props.element.hasOwnProperty("required") ? this.props.element.required : false;
      var this_read_only = this.props.element.hasOwnProperty("readOnly") ? this.props.element.readOnly : false;
      var this_default_today = this.props.element.hasOwnProperty("defaultToday") ? this.props.element.defaultToday : false;
      var this_show_time_select = this.props.element.hasOwnProperty("showTimeSelect") ? this.props.element.showTimeSelect : false;
      var this_show_time_select_only = this.props.element.hasOwnProperty("showTimeSelectOnly") ? this.props.element.showTimeSelectOnly : false;
      var this_checked_inline = this.props.element.hasOwnProperty("inline") ? this.props.element.inline : false;
      var this_checked_bold = this.props.element.hasOwnProperty("bold") ? this.props.element.bold : false;
      var this_checked_italic = this.props.element.hasOwnProperty("italic") ? this.props.element.italic : false;
      var this_checked_center = this.props.element.hasOwnProperty("center") ? this.props.element.center : false;
      var this_checked_page_break = this.props.element.hasOwnProperty("pageBreakBefore") ? this.props.element.pageBreakBefore : false;
      var this_checked_alternate_form = this.props.element.hasOwnProperty("alternateForm") ? this.props.element.alternateForm : false;
      var _this$props$element = this.props.element,
          canHavePageBreakBefore = _this$props$element.canHavePageBreakBefore,
          canHaveAlternateForm = _this$props$element.canHaveAlternateForm,
          canHaveDisplayHorizontal = _this$props$element.canHaveDisplayHorizontal,
          canHaveOptionCorrect = _this$props$element.canHaveOptionCorrect,
          canHaveOptionValue = _this$props$element.canHaveOptionValue;
      var this_files = this.props.files.length ? this.props.files : [];

      if (this_files.length < 1 || this_files.length > 0 && this_files[0].id !== "") {
        this_files.unshift({
          id: "",
          file_name: ""
        });
      }

      var editorState;

      if (this.props.element.hasOwnProperty("content")) {
        editorState = this.convertFromHTML(this.props.element.content);
      }

      if (this.props.element.hasOwnProperty("label")) {
        editorState = this.convertFromHTML(this.props.element.label);
      }

      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "clearfix",
        style: {
          marginTop: 50
        }
      }, /*#__PURE__*/_react["default"].createElement("h4", {
        className: "float-left h4"
      }, this.props.element.text), /*#__PURE__*/_react["default"].createElement("i", {
        className: "float-right fa fa-times dismiss-edit",
        onClick: this.props.manualEditModeOff
      })), this.props.element.hasOwnProperty("content") && /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label"
      }, "Texto a mostrar:"), /*#__PURE__*/_react["default"].createElement(_reactDraftWysiwyg.Editor, {
        toolbar: toolbar,
        defaultEditorState: editorState,
        onBlur: this.updateElement.bind(this),
        onEditorStateChange: this.onEditorStateChange.bind(this, 0, "content"),
        stripPastedStyles: true
      })), this.props.element.hasOwnProperty("file_path") && /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "fileSelect"
      }, "Elegir archivo:"), /*#__PURE__*/_react["default"].createElement("select", {
        id: "fileSelect",
        className: "form-control",
        defaultValue: this.props.element.file_path,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, "file_path", "value")
      }, this_files.map(function (file) {
        var this_key = "file_".concat(file.id);
        return /*#__PURE__*/_react["default"].createElement("option", {
          value: file.id,
          key: this_key
        }, file.file_name);
      }))), this.props.element.hasOwnProperty("href") && /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement(_reactTextareaAutosize["default"], {
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.href,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, "href", "value")
      })), this.props.element.hasOwnProperty("src") && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "srcInput"
      }, "Link a:"), /*#__PURE__*/_react["default"].createElement("input", {
        id: "srcInput",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.src,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, "src", "value")
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        id: "do-center",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_checked_center,
        value: true,
        onChange: this.editElementProp.bind(this, "center", "checked")
      }), /*#__PURE__*/_react["default"].createElement("label", {
        className: "custom-control-label",
        htmlFor: "do-center"
      }, "Centrado?"))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "row"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-sm-3"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "elementWidth"
      }, "Ancho:"), /*#__PURE__*/_react["default"].createElement("input", {
        id: "elementWidth",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.width,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, "width", "value")
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "col-sm-3"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "elementHeight"
      }, "Alto:"), /*#__PURE__*/_react["default"].createElement("input", {
        id: "elementHeight",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.height,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, "height", "value")
      })))), this.props.element.hasOwnProperty("label") && /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("label", null, "Pregunta"), /*#__PURE__*/_react["default"].createElement(_reactDraftWysiwyg.Editor, {
        toolbar: toolbar,
        defaultEditorState: editorState,
        onBlur: this.updateElement.bind(this),
        onEditorStateChange: this.onEditorStateChange.bind(this, 0, "label"),
        stripPastedStyles: true
      }), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        id: "is-required",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_checked,
        value: true,
        onChange: this.editElementProp.bind(this, "required", "checked")
      }), /*#__PURE__*/_react["default"].createElement("label", {
        className: "custom-control-label",
        htmlFor: "is-required"
      }, "Requerido")), this.props.element.hasOwnProperty("readOnly") && /*#__PURE__*/_react["default"].createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        id: "is-read-only",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_read_only,
        value: true,
        onChange: this.editElementProp.bind(this, "readOnly", "checked")
      }), /*#__PURE__*/_react["default"].createElement("label", {
        className: "custom-control-label",
        htmlFor: "is-read-only"
      }, "Solo lectura")), this.props.element.hasOwnProperty("defaultToday") && /*#__PURE__*/_react["default"].createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        id: "is-default-to-today",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_default_today,
        value: true,
        onChange: this.editElementProp.bind(this, "defaultToday", "checked")
      }), /*#__PURE__*/_react["default"].createElement("label", {
        className: "custom-control-label",
        htmlFor: "is-default-to-today"
      }, "\xBFHoy por defecto?")), this.props.element.hasOwnProperty("showTimeSelect") && /*#__PURE__*/_react["default"].createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        id: "show-time-select",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_show_time_select,
        value: true,
        onChange: this.editElementProp.bind(this, "showTimeSelect", "checked")
      }), /*#__PURE__*/_react["default"].createElement("label", {
        className: "custom-control-label",
        htmlFor: "show-time-select"
      }, "Mostrar hora?")), this_show_time_select && this.props.element.hasOwnProperty("showTimeSelectOnly") && /*#__PURE__*/_react["default"].createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        id: "show-time-select-only",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_show_time_select_only,
        value: true,
        onChange: this.editElementProp.bind(this, "showTimeSelectOnly", "checked")
      }), /*#__PURE__*/_react["default"].createElement("label", {
        className: "custom-control-label",
        htmlFor: "show-time-select-only"
      }, "Mostrar hora solamente?")), (this.state.element.element === "RadioButtons" || this.state.element.element === "Checkboxes") && canHaveDisplayHorizontal && /*#__PURE__*/_react["default"].createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        id: "display-horizontal",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_checked_inline,
        value: true,
        onChange: this.editElementProp.bind(this, "inline", "checked")
      }), /*#__PURE__*/_react["default"].createElement("label", {
        className: "custom-control-label",
        htmlFor: "display-horizontal"
      }, "Horizontal"))), this.state.element.element === "Signature" && this.props.element.readOnly ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "variableKey"
      }, "Variable Key:"), /*#__PURE__*/_react["default"].createElement("input", {
        id: "variableKey",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.variableKey,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, "variableKey", "value")
      }), /*#__PURE__*/_react["default"].createElement("p", {
        className: "help-block"
      }, "This will give the element a key that can be used to replace the content with a runtime value.")) : /*#__PURE__*/_react["default"].createElement("div", null), this.state.element.element === "Rating" && /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "variableKey"
      }, "Cantidad de estrellas"), /*#__PURE__*/_react["default"].createElement("input", {
        id: "ratingAmount",
        type: "number",
        className: "form-control",
        defaultValue: this.props.element.ratingAmount,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, "ratingAmount", "value")
      })), this.props.element.hasOwnProperty("step") && /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group-range"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "rangeStep"
      }, "Step"), /*#__PURE__*/_react["default"].createElement("input", {
        id: "rangeStep",
        type: "number",
        className: "form-control",
        defaultValue: this.props.element.step,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, "step", "value")
      }))), this.props.element.hasOwnProperty("min_value") && /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group-range"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "rangeMin"
      }, "Min"), /*#__PURE__*/_react["default"].createElement("input", {
        id: "rangeMin",
        type: "number",
        className: "form-control",
        defaultValue: this.props.element.min_value,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, "min_value", "value")
      }), /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.min_label,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, "min_label", "value")
      }))), this.props.element.hasOwnProperty("max_value") && /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group-range"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "rangeMax"
      }, "Max"), /*#__PURE__*/_react["default"].createElement("input", {
        id: "rangeMax",
        type: "number",
        className: "form-control",
        defaultValue: this.props.element.max_value,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, "max_value", "value")
      }), /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.max_label,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, "max_label", "value")
      }))), this.props.element.hasOwnProperty("default_value") && /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group-range"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "defaultSelected"
      }, "Selecci\xF3n por defecto"), /*#__PURE__*/_react["default"].createElement("input", {
        id: "defaultSelected",
        type: "number",
        className: "form-control",
        defaultValue: this.props.element.default_value,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, "default_value", "value")
      }))), this.props.element.showDescription && /*#__PURE__*/_react["default"].createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "control-label",
        htmlFor: "questionDescription"
      }, "Descripci\xF3n"), /*#__PURE__*/_react["default"].createElement(_reactTextareaAutosize["default"], {
        type: "text",
        className: "form-control",
        id: "questionDescription",
        defaultValue: this.props.element.description,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, "description", "value")
      })), this.props.element.hasOwnProperty("options") && /*#__PURE__*/_react["default"].createElement(_dynamicOptionList["default"], {
        showCorrectColumn: this.props.showCorrectColumn,
        canHaveOptionCorrect: canHaveOptionCorrect,
        canHaveOptionValue: canHaveOptionValue,
        data: this.props.preview.state.data,
        updateElement: this.props.updateElement,
        preview: this.props.preview,
        element: this.props.element,
        key: this.props.element.options.length
      }));
    }
  }]);

  return FormElementsEdit;
}(_react["default"].Component);

exports["default"] = FormElementsEdit;
FormElementsEdit.defaultProps = {
  className: "edit-element-fields"
};