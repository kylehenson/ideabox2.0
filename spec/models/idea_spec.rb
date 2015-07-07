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

  it "changes the quality of an idea by adding to the quality index number" do
    idea = Idea.create!(title: "It is getting better", body: "Soon")
    expect(idea.quality).to eq "swill"

    idea.thumbs_up
    expect(idea.quality).to eq "plausible"

    idea.thumbs_up
    expect(idea.quality).to eq "genius"
  end

  it "changes the quality of an idea by subtracting from the quality index number" do
    idea = Idea.create!(title: "It is getting better", body: "Soon", quality: "genius")
    expect(idea.quality).to eq "genius"

    idea.thumbs_down
    expect(idea.quality).to eq "plausible"

    idea.thumbs_down
    expect(idea.quality).to eq "swill"
  end
end
