class TasksController < ApplicationController
  def create
    @project = Project.find(params[:project_id])
    #params[:task][:task_number] = @project.tasks.last.task_number + 1
    @task = @project.tasks.create(task_params)
    redirect_to project_path(@project)
  end

  def update_task_number
    @task = Task.find(params[:task][:task_id])
    @task.task_number = params[:task][:task_number_position]
    @task.save

    render nothing: true
  end


  private

  def task_params
    params.require(:task).permit(
      :name,
      :start_date,
      :finish_date,
      :prerequisite#,
      #:task_number
    )
  end
end
