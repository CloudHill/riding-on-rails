import React from 'react';
import Tag from './Tag';
import TagInterface from './TagInterface';
import { TwitterPicker } from 'react-color';

interface Props {
  tags: TagInterface[];
  onClick?: (tag: TagInterface) => void;
  remove?: (tag: TagInterface) => void;
  editing?: boolean;
  updateTag?: (tag: TagInterface, newProps) => void;
}

interface State {
  colorPickerTag: TagInterface;
}

class TagList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      colorPickerTag: null
    }

    this.showColorPicker = this.showColorPicker.bind(this);
    this.onPickerChange = this.onPickerChange.bind(this);
  }

  showColorPicker(tag: TagInterface) {
    this.setState({
      colorPickerTag: tag
    });
  }

  onPickerChange(color: {hex: string}) {
    const colorHex = color.hex.slice(1);
    this.props.updateTag(this.state.colorPickerTag, { color: colorHex })
  }

  render() {
    const { tags, onClick, editing } = this.props;
    const { colorPickerTag } = this.state;
    if (!tags) return null;

    const color = {
      editing, colorPickerTag,
      showColorPicker: this.showColorPicker
    }

    const defaultColors = [
      '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB'
    ];

    const allTags = tags.map(tag => (
      <Tag
        key={tag.id}
        tag={tag}
        onClick={onClick}
        remove={this.props.remove}
        color={color}
      />
    ));

    return (
      <div className="taglist">
        {allTags}
        {
          !(colorPickerTag === null)
            ? (
              <div className="colorpicker">
                <TwitterPicker 
                  width={240}
                  triangle="hide" 
                  colors={defaultColors}
                  onChange={this.onPickerChange}
                />
              </div>
            ) : null
        }
      </div>
    )
  }
}

export default TagList;
