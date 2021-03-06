Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: {format: 'json'} do
    resource :session, only: [:create, :destroy, :show]
    resources :users, only: [:create, :update, :show, :index]
    resources :projects, only: [:create, :update, :show, :destroy] do
      resources :todo_lists, only: [:create, :update, :show, :index, :destroy] do
        resources :todo_items, only: [:create]
      end
    end
    resources :todo_items, only: [:show, :update, :destroy]
    resources :project_memberships, only: [:create]
    delete 'project_memberships', to: 'project_memberships#destroy'
  end
end
