class Api::V1::TasksController < ApplicationController
  def index
    tasks = Task.all.order(created_at: :desc)
    render json: tasks
  end

  def show
    if (task)
      render json: task, include: :tags
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

      if (params.has_key?(:add_tag))
        @tag = Tag.find(params[:add_tag])
        task.tags << @tag unless task.tags.exists?(@tag.id)
      end

      if (params.has_key?(:remove_tag))
        @tag = Tag.find(params[:remove_tag])
        task.tags.delete(@tag)
      end

      render json: task, include: :tags
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
    params.permit(:title, :note, :important, :completed, :completed_at, :due_at, :task_list_id)
  end

  def task
    @task ||= Task.find(params[:id])
  end
end
