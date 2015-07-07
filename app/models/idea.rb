class Idea < ActiveRecord::Base
  validates :title, presence: true, uniqueness: true
  validates :body,  presence: true

  enum quality: ["swill", "plausible", "genius"]

  def thumbs_up
    if self.quality == "swill"
      self.quality = "plausible"
    else
      self.quality = "genius"
    end
  end

  def thumbs_down
    if self.quality == "genius"
      self.quality = "plausible"
    else
      self.quality = "swill"
    end
  end
end
