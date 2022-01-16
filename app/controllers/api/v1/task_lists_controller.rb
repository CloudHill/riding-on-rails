class Api::V1::TaskListsController < ApplicationController
  def index
    task_lists = TaskList.all
    render json: task_lists
  end

  def show
    if (task_list)
      render json: task_list
    else
      render json: task_list.errors
    end
  end

  def create
    task_list = TaskList.create!(task_list_params)
    if (task_list)
      render json: task_list
    else
      render json: task_list.errors
    end
  end

  def update
    if (task_list)
      task_list&.update(task_list_params)
      render json: task_list
    else
      render json: task_list.errors
    end
  end

  def destroy
    task_list&.destroy
    render json: { message: 'Task list deleted' }
  end

  private

  def task_list_params
    params.permit(:name)
  end

  def task_list
    @task_list ||= TaskList.find(params[:id])
  end
end
