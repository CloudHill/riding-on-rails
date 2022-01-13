import React from 'react';
import TaskInterface from './TaskInterface';
import { formatDate } from '../helpers';
import { Star, Calendar } from 'react-feather';

class TaskDisplay extends React.Component<{task: TaskInterface}> {
  render() {
    const { title, note, important, due_at:dueAt } = this.props.task;
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
            important || dueDate
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
        </div>
      )
    )
  }
}

export default TaskDisplay;
