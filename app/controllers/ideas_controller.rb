class IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def show
  end

  def create
    respond_with Idea.create(idea_params), location: nil
  end

  def destroy
    respond_with Idea.destroy(params[:id])
  end

  def update
    respond_with Idea.update(params[:id], idea_params)
  end

  private

  def idea_params
    params.permit(:title, :body)
  end

end
