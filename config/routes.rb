Rails.application.routes.draw do
  root to: "ideas#show"

  resources :ideas, except: [:show]
end
