class Api::ProjectMembershipsController < ApplicationController
  def create
    @pm = ProjectMembership.new(project_membership_params)
    if (@pm.save)
      @project = Project.find_by_id(params[:project_membership][:project_id])
      render "api/projects/show", locals: {show_members: true}
    else
      @errors = @pm.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def destroy
    @pm = ProjectMembership.where(project_id: params[:project_membership][:project_id])
      .where(member_id: params[:project_membership][:member_id]).first
    # @pm = ProjectMembership.find_by_id(params[:id])
    if (@pm && @pm.destroy)
      @project = Project.find_by_id(params[:project_membership][:project_id])
      render "api/projects/show", locals: {show_members: true}
    else
      @errors = @pm.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def project_membership_params
    params.require(:project_membership).permit(:project_id, :member_id)
  end
end
