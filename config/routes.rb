Rails.application.routes.draw do
  root to: "ideas#show"

  resources :ideas, only: [:index, :create]
end
