import React from 'react';
import TaskInterface from './TaskInterface';
import TagList from '../tags/TagList';
import { formatDate } from '../../helpers';
import { Star, Calendar } from 'react-feather';

class TaskDisplay extends React.Component<{task: TaskInterface}> {
  render() {
    const { title, note, important, completed, due_at:dueAt, tags } = this.props.task;
    const dueDate = dueAt ? new Date(dueAt) : null;
    
    return (
      (
        <div className="task-info">
          <div className="task-title">{title}</div>
          {
            note 
              ? (
                <div className="task-note">
                  {note.replace(/<br>/g,"\n")}
                </div> 
              ) : null
          }
          {
            !completed && (important || dueDate)
              ? (
                <div className="task-bar">
                  <div className="task-options">
                    {
                      important
                        ? (
                          //@ts-ignore
                          <div className="task-option" active="">
                            <Star size="100%" fill=""/>
                          </div>
                        ) : null
                    }
                    {
                      dueDate
                        ? (
                          //@ts-ignore
                          <div className="task-option" active="">
                            <Calendar size="100%" fill=""/>
                            <span className="option-date">
                              {formatDate(dueDate)}
                            </span>
                          </div>
                        ) : null
                    }
                  </div>
                </div>
              ) : null
          }
          <TagList tags={tags}/>
        </div>
      )
    )
  }
}

export default TaskDisplay;
