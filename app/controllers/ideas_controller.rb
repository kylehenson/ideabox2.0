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

  private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end

end
