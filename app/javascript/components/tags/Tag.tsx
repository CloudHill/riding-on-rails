import React from 'react';
import TagInterface from './TagInterface';
import { X, Droplet } from 'react-feather';

interface Props { 
  tag: TagInterface 
  onClick: (tag: TagInterface) => void;
  remove: (tag: TagInterface) => void;
  color?: {
    editing: boolean;
    colorPickerTag: TagInterface;
    showColorPicker: (tag: TagInterface) => void;
  };
}

class Tag extends React.Component<Props> {
  render() {
    const { tag, onClick, remove, color } = this.props;
    const colorPickerActive = color.colorPickerTag?.id === tag.id;

    return (
      <div 
        className={"tag" + (remove ? " tag-rm" : "")}
        style={{background: '#' + (tag.color || 'dfdfdf')}}
        onClick={() => onClick(tag)}
      >
        {tag.name}
        {
          remove
            ? (
              <span className="mini-button" 
                onClick = {e => {
                  remove(tag);
                  e.stopPropagation();
                }}>
                  <X size="10px"/>
              </span>
            ) : null
        }
        {
          color?.editing
            ? (
              <>
                <span 
                  className="mini-button" 
                  //@ts-ignore
                  active={colorPickerActive ? "" : undefined}
                  onClick = {e => {
                    color.showColorPicker(colorPickerActive ? null : tag);
                    e.stopPropagation();
                  }}>
                    <Droplet size="10px"/>
                </span>
              </>
            ) : null
        }
      </div>
    )
  }
}

export default Tag;
