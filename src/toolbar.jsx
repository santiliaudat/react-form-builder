/**
 * <Toolbar />
 */

import React from "react";
import ToolbarItem from "./toolbar-draggable-item";
import ID from "./UUID";
import store from "./stores/store";

function isDefaultItem(item) {
  const keys = Object.keys(item);
  return keys.filter((x) => x !== "element" && x !== "key").length === 0;
}

function buildItems(items, defaultItems) {
  if (!items) {
    return defaultItems;
  }
  return items.map((x) => {
    let found;
    if (isDefaultItem(x)) {
      found = defaultItems.find(
        (y) => (x.element || x.key) === (y.element || y.key)
      );
    }
    return found || x;
  });
}

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    const items = buildItems(props.items, this._defaultItems());
    this.state = {
      items,
    };
    store.subscribe((state) => this.setState({ store: state }));
    this.create = this.create.bind(this);
  }

  static _defaultItemOptions(element) {
    switch (element) {
      case "Dropdown":
        return [
          {
            value: "place_holder_option_1",
            text: "Opción 1",
            key: `dropdown_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_2",
            text: "Opción 2",
            key: `dropdown_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_3",
            text: "Opción 3",
            key: `dropdown_option_${ID.uuid()}`,
          },
        ];
      case "Tags":
        return [
          {
            value: "place_holder_tag_1",
            text: "Place holder tag 1",
            key: `tags_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_tag_2",
            text: "Place holder tag 2",
            key: `tags_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_tag_3",
            text: "Place holder tag 3",
            key: `tags_option_${ID.uuid()}`,
          },
        ];
      case "Checkboxes":
        return [
          {
            value: "place_holder_option_1",
            text: "Opción 1",
            key: `checkboxes_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_2",
            text: "Opción 2",
            key: `checkboxes_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_3",
            text: "Opción 3",
            key: `checkboxes_option_${ID.uuid()}`,
          },
        ];
      case "RadioButtons":
        return [
          {
            value: "place_holder_option_1",
            text: "Opción 1",
            key: `radiobuttons_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_2",
            text: "Opción 2",
            key: `radiobuttons_option_${ID.uuid()}`,
          },
          {
            value: "place_holder_option_3",
            text: "Opción 3",
            key: `radiobuttons_option_${ID.uuid()}`,
          },
        ];
      default:
        return [];
    }
  }

  _defaultItems() {
    return [
      {
        key: "Header",
        name: "Título",
        icon: "fa fa-heading",
        static: true,
        content: "Ingrese el título",
      },
      {
        key: "Label",
        name: "Texto",
        static: true,
        icon: "fa fa-font",
        content: "Ingrese el texto",
      },
      {
        key: "LineBreak",
        name: "Línea",
        static: true,
        icon: "fa fa-arrows-alt-h",
      },
      {
        key: "Dropdown",
        canHaveAnswer: true,
        name: "Menú desplegable",
        icon: "fa fa-caret-square-down",
        label: "Ingrese la pregunta",
        field_name: "dropdown_",
        options: [],
        canHaveOptionCorrect: false,
      },
      // {
      //   key: "Tags",
      //   canHaveAnswer: true,
      //   name: "Tags",
      //   icon: "fa fa-tags",
      //   label: "Placeholder Label",
      //   field_name: "tags_",
      //   options: [],
      // },
      {
        key: "Checkboxes",
        canHaveAnswer: true,
        name: "Casilla de verificación",
        icon: "fa fa-check-square",
        label: "Ingrese la pregunta",
        field_name: "checkboxes_",
        options: [],
        canHaveOptionCorrect: false,
      },
      {
        key: "RadioButtons",
        canHaveAnswer: true,
        name: "Múltiple opción",
        icon: "fa fa-dot-circle",
        label: "Ingrese la pregunta",
        field_name: "radiobuttons_",
        options: [],
        canHaveOptionCorrect: false,
      },
      {
        key: "TextInput",
        canHaveAnswer: true,
        name: "Input de texto",
        label: "Ingrese la pregunta",
        icon: "fa fa-font",
        field_name: "text_input_",
      },
      {
        key: "NumberInput",
        canHaveAnswer: true,
        name: "Input numérico",
        label: "Ingrese la pregunta",
        icon: "fa fa-plus",
        field_name: "number_input_",
      },
      {
        key: "TextArea",
        canHaveAnswer: true,
        name: "Input multi-línea",
        label: "Ingrese la pregunta",
        icon: "fa fa-text-height",
        field_name: "text_area_",
      },
      {
        key: "Camera",
        name: "Adjuntar imagen",
        icon: "fa fa-camera",
        label: "Ingrese la pregunta",
        field_name: "camera_",
      },
      {
        key: "Rating",
        canHaveAnswer: true,
        name: "Valoración de estrellas",
        label: "Ingrese la pregunta",
        icon: "fa fa-star",
        field_name: "rating_",
        ratingAmount: 5,
      },
      {
        key: "DatePicker",
        canDefaultToday: true,
        canReadOnly: true,
        dateFormat: "dd/MM/yyyy",
        timeFormat: "hh:mm aa",
        showTimeSelect: false,
        showTimeSelectOnly: false,
        name: "Fecha y hora",
        icon: "fa fa-calendar-alt",
        label: "Ingrese la pregunta",
        field_name: "date_picker_",
      },
      {
        key: "Range",
        name: "Rango",
        icon: "fa fa-sliders-h",
        label: "Ingrese la pregunta",
        field_name: "range_",
        step: 1,
        default_value: 3,
        min_value: 1,
        max_value: 5,
        min_label: "Facil",
        max_label: "Dificil",
      },
    ]
  }

  // _defaultItems() {
  //   return [
  //     {
  //       key: "Header",
  //       name: "Header Text",
  //       icon: "fa fa-heading",
  //       static: true,
  //       content: "Placeholder Text...",
  //     },
  //     {
  //       key: "Label",
  //       name: "Label",
  //       static: true,
  //       icon: "fa fa-font",
  //       content: "Placeholder Text...",
  //     },
  //     {
  //       key: "Paragraph",
  //       name: "Paragraph",
  //       static: true,
  //       icon: "fa fa-paragraph",
  //       content: "Placeholder Text...",
  //     },
  //     {
  //       key: "LineBreak",
  //       name: "Line Break",
  //       static: true,
  //       icon: "fa fa-arrows-alt-h",
  //     },
  //     {
  //       key: "Dropdown",
  //       canHaveAnswer: true,
  //       name: "Dropdown",
  //       icon: "fa fa-caret-square-down",
  //       label: "Placeholder Label",
  //       field_name: "dropdown_",
  //       options: [],
  //     },
  //     {
  //       key: "Tags",
  //       canHaveAnswer: true,
  //       name: "Tags",
  //       icon: "fa fa-tags",
  //       label: "Placeholder Label",
  //       field_name: "tags_",
  //       options: [],
  //     },
  //     {
  //       key: "Checkboxes",
  //       canHaveAnswer: true,
  //       name: "Checkboxes",
  //       icon: "fa fa-check-square",
  //       label: "Placeholder Label",
  //       field_name: "checkboxes_",
  //       options: [],
  //     },
  //     {
  //       key: "RadioButtons",
  //       canHaveAnswer: true,
  //       name: "Multiple Choice",
  //       icon: "fa fa-dot-circle",
  //       label: "Placeholder Label",
  //       field_name: "radiobuttons_",
  //       options: [],
  //     },
  //     {
  //       key: "TextInput",
  //       canHaveAnswer: true,
  //       name: "Text Input",
  //       label: "Placeholder Label",
  //       icon: "fa fa-font",
  //       field_name: "text_input_",
  //     },
  //     {
  //       key: "NumberInput",
  //       canHaveAnswer: true,
  //       name: "Number Input",
  //       label: "Placeholder Label",
  //       icon: "fa fa-plus",
  //       field_name: "number_input_",
  //     },
  //     {
  //       key: "TextArea",
  //       canHaveAnswer: true,
  //       name: "Multi-line Input",
  //       label: "Placeholder Label",
  //       icon: "fa fa-text-height",
  //       field_name: "text_area_",
  //     },
  //     {
  //       key: "Image",
  //       name: "Image",
  //       label: "",
  //       icon: "fa fa-image",
  //       field_name: "image_",
  //       src: "",
  //     },
  //     {
  //       key: "Rating",
  //       canHaveAnswer: true,
  //       name: "Rating",
  //       label: "Placeholder Label",
  //       icon: "fa fa-star",
  //       field_name: "rating_",
  //     },
  //     {
  //       key: "DatePicker",
  //       canDefaultToday: true,
  //       canReadOnly: true,
  //       dateFormat: "MM/dd/yyyy",
  //       timeFormat: "hh:mm aa",
  //       showTimeSelect: false,
  //       showTimeSelectOnly: false,
  //       name: "Date",
  //       icon: "fa fa-calendar-alt",
  //       label: "Placeholder Label",
  //       field_name: "date_picker_",
  //     },
  //     {
  //       key: "Signature",
  //       canReadOnly: true,
  //       name: "Signature",
  //       icon: "fa fa-pen-square",
  //       label: "Signature",
  //       field_name: "signature_",
  //     },
  //     {
  //       key: "HyperLink",
  //       name: "Web site",
  //       icon: "fa fa-link",
  //       static: true,
  //       content: "Placeholder Web site link ...",
  //       href: "http://www.example.com",
  //     },
  //     {
  //       key: "Download",
  //       name: "File Attachment",
  //       icon: "fa fa-file",
  //       static: true,
  //       content: "Placeholder file name ...",
  //       field_name: "download_",
  //       file_path: "",
  //       _href: "",
  //     },
  //     {
  //       key: "Range",
  //       name: "Range",
  //       icon: "fa fa-sliders-h",
  //       label: "Placeholder Label",
  //       field_name: "range_",
  //       step: 1,
  //       default_value: 3,
  //       min_value: 1,
  //       max_value: 5,
  //       min_label: "Easy",
  //       max_label: "Difficult",
  //     },
  //     {
  //       key: "Camera",
  //       name: "Camera",
  //       icon: "fa fa-camera",
  //       label: "Placeholder Label",
  //       field_name: "camera_",
  //     },
  //   ];
  // }

  create(item) {
    const elementOptions = {
      id: ID.uuid(),
      element: item.element || item.key,
      text: item.name,
      static: item.static,
      required: false,
      showDescription: item.showDescription,
    };

    if (this.props.showDescription === true && !item.static) {
      elementOptions.showDescription = true;
    }

    if (item.type === "custom") {
      elementOptions.key = item.key;
      elementOptions.custom = true;
      elementOptions.forwardRef = item.forwardRef;
      elementOptions.bare = item.bare;
      elementOptions.props = item.props;
      elementOptions.component = item.component || null;
      elementOptions.custom_options = item.custom_options || [];
    }

    if (item.static) {
      elementOptions.bold = false;
      elementOptions.italic = false;
    }

    if (item.canHaveAnswer) {
      elementOptions.canHaveAnswer = item.canHaveAnswer;
    }

    if (item.canReadOnly) {
      elementOptions.readOnly = false;
    }

    if (item.canDefaultToday) {
      elementOptions.defaultToday = false;
    }

    if (item.content) {
      elementOptions.content = item.content;
    }

    if (item.href) {
      elementOptions.href = item.href;
    }

    elementOptions.canHavePageBreakBefore =
      item.canHavePageBreakBefore !== false;
    elementOptions.canHaveAlternateForm = item.canHaveAlternateForm !== false;
    elementOptions.canHaveDisplayHorizontal =
      item.canHaveDisplayHorizontal !== false;
    if (elementOptions.canHaveDisplayHorizontal) {
      elementOptions.inline = item.inline;
    }
    elementOptions.canHaveOptionCorrect = item.canHaveOptionCorrect !== false;
    elementOptions.canHaveOptionValue = item.canHaveOptionValue !== false;
    elementOptions.canPopulateFromApi = item.canPopulateFromApi !== false;

    if (item.class_name) {
      elementOptions.class_name = item.class_name;
    }

    if (item.key === "Image") {
      elementOptions.src = item.src;
    }

    if (item.key === "DatePicker") {
      elementOptions.dateFormat = item.dateFormat;
      elementOptions.timeFormat = item.timeFormat;
      elementOptions.showTimeSelect = item.showTimeSelect;
      elementOptions.showTimeSelectOnly = item.showTimeSelectOnly;
    }

    if (item.key === "Download") {
      elementOptions._href = item._href;
      elementOptions.file_path = item.file_path;
    }

    if (item.key === "Range") {
      elementOptions.step = item.step;
      elementOptions.default_value = item.default_value;
      elementOptions.min_value = item.min_value;
      elementOptions.max_value = item.max_value;
      elementOptions.min_label = item.min_label;
      elementOptions.max_label = item.max_label;
    }

    if (item.key === "Rating") {
      elementOptions.ratingAmount = item.ratingAmount;
    }

    if (item.defaultValue) {
      elementOptions.defaultValue = item.defaultValue;
    }

    if (item.field_name) {
      elementOptions.field_name = item.field_name + ID.uuid();
    }

    if (item.label) {
      elementOptions.label = item.label;
    }

    if (item.options) {
      if (item.options.length > 0) {
        elementOptions.options = item.options;
      } else {
        elementOptions.options = Toolbar._defaultItemOptions(
          elementOptions.element
        );
      }
    }

    return elementOptions;
  }

  _onClick(item) {
    // ElementActions.createElement(this.create(item));
    store.dispatch("create", this.create(item));
  }

  render() {
    return (
      <div className="col-md-3 react-form-builder-toolbar float-left">
        <ul>
          {this.state.items.map((item) => (
            <ToolbarItem
              data={item}
              key={item.key}
              onClick={this._onClick.bind(this, item)}
              onCreate={this.create}
            />
          ))}
        </ul>
      </div>
    );
  }
}
