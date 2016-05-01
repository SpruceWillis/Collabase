Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: {format: 'json'} do
    resource :session, only: [:create, :destroy, :show]
    resources :users, only: [:create, :update, :show]
    resources :projects, only: [:create, :update, :show, :destroy]
    resources :project_memberships, only: [:create]
    delete 'project_memberships', to: 'project_memberships#destroy'
  end
end
