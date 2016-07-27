class ProjectsController < ApplicationController
  def new
    @project = Project.new
  end

  def create
    @project = Project.new(project_params)
    @project.user = current_user

    if @project.save
      redirect_to root_url
    else
      render 'new'
    end
  end

  def index
    redirect_to root_path
  end

  def show
    @project = Project.find(params[:id])
  end

  private

  def project_params
    params.require(:project).permit(
      :title,
      :description,
      :start_date
    )
  end
end
