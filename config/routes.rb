Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  get 'pages/gantt'

  resources :projects do
    resources :tasks do
      post :update_task_number, on: :collection
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
