require 'rails_helper'

RSpec.describe Idea, type: :model do
  it "is valid with a title and body" do
    idea = Idea.create!(title: "Food", body: "I'm hungry")

    expect(idea).to be_valid
  end

  it "when an idea is created it starts out at swill for the quality" do
    idea = Idea.create!(title: "Not the greatest idea", body: "Whatev")

    expect(idea.quality).to eq "swill"
  end
end
