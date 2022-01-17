Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'tags', to: 'tags#index'
      get 'tags/:name', to: 'tags#show'
      post 'tags', to: 'tags#create'
      patch 'tags/:name', to: 'tags#update'
      delete 'tags/:name', to: 'tags#destroy'

      get 'task_lists', to: 'task_lists#index'
      get 'task_lists/:id', to: 'task_lists#show'
      post 'task_lists', to: 'task_lists#create'
      patch 'task_lists/:id', to: 'task_lists#update'
      delete 'task_lists/:id', to: 'task_lists#destroy'
      
      get 'tasks', to: 'tasks#index'
      get 'tasks/:id', to: 'tasks#show'
      post 'tasks', to: 'tasks#create'
      patch 'tasks/:id', to: 'tasks#update'
      delete 'tasks/:id', to: 'tasks#destroy'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
