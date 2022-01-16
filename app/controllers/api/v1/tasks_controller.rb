class Api::V1::TasksController < ApplicationController
  def index
    tasks = Task.all.order(created_at: :desc)
    render json: tasks
  end

  def show
    if (task)
      render json: task
    else
      render json: task.errors
    end
  end

  def create
    task = Task.create!(task_params)
    if (task)
      render json: task
    else
      render json: task.errors
    end
  end

  def update
    if (task)
      task&.update(task_params)
      render json: task
    else
      render json: task.errors
    end
  end

  def destroy
    task&.destroy
    render json: { message: 'Task deleted' }
  end

  private

  def task_params
    params.permit(:title, :note, :important, :completed, :completed_at, :due_at)
  end

  def task
    @task ||= Task.find(params[:id])
  end
end
