class Api::ProjectMembershipsController < ApplicationController
  def create
    @pm = ProjectMembership.new(project_membership_params)
    if (@pm.save)
      @user = User.find(params[:project_membership][:member_id])
      render "api/users/show", locals: {show_projects: false}
    else
      @errors = @pm.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def destroy
    # @pm = ProjectMembership.where(project_id: params[:project_membership][:project_id])
    #   .where(member_id: params[:project_membership][:member_id]).first
    @pm = ProjectMembership.find_by_id(params[:id])
    if (@pm && @pm.destroy)
      @user = User.find(params[:project_membership][:member_id])
      render "api/users/show", locals: {show_projects: false}
    else
      @errors = @pm.errors.full_messages
      render "api/shared/errors", status: 422
    end
  end

  def project_membership_params
    params.require(:project_membership).permit(:project_id, :member_id)
  end
end
