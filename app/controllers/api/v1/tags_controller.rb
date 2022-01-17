class Api::V1::TagsController < ApplicationController
  def index
    tags = Tag.all
    render json: tags
  end

  def show
    if (tag)
      render json: tag
    else
      render json: tag.errors
    end
  end

  def create
    tag = Tag.create!(tag_params)
    if (tag)
      render json: tag
    else
      render json: tag.errors
    end
  end

  def update
    if (tag)
      tag&.update(tag_params)
      render json: tag
    else
      render json: tag.errors
    end
  end

  def destroy
    tag&.destroy
    render json: { message: 'Tag deleted' }
  end

  private

  def tag_params
    params.permit(:name, :color)
  end

  def tag
    @tag ||= Tag.find(params[:id])
  end
end
