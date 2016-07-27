class TasksController < ApplicationController
  def new
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)

    if @task.save
      redirect_to root_url
    else
      render 'new'
    end
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
