Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'tasks/index'
      post 'tasks', to: 'tasks#create'
      patch 'tasks/:id', to: 'tasks#update'
      delete 'tasks/:id', to: 'tasks#destroy'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
