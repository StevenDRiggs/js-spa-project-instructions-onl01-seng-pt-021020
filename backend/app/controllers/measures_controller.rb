class MeasuresController < ApplicationController
  def index
    render json: Measure.all
  end
end
