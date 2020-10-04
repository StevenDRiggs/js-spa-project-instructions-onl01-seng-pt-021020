class MeasuresController < ApplicationController
  def index
    render json: Measure.all
  end

  def create
    measure = Measure.create(measure_params)

    render json: measure
  end

  def update
    measure = Measure.find(params[:id])
    measure.update(measure_params)

    render json: measure
  end

  private
    def measure_params
      params.require(:measure).permit(:measure, :divisible)
    end
end
