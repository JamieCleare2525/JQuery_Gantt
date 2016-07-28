class TasksController < ApplicationController
  def create
    @project = Project.find(params[:project_id])
    @task = @project.tasks.create(task_params)
    redirect_to project_path(@project)
  end

  private

  def task_params
    params.require(:task).permit(
      :name,
      :start_date,
      :finish_date,
      :prerequisite
    )
  end
end
