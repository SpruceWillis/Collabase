class Api::ProjectsController < ApplicationController

  def create
    @project = Project.new(project_params)
    # @project.owner_id = current_user.id
    if (@project.save)
        ProjectMembership.create!({
          member_id: @project.owner_id,
          project_id: @project.id
          })
      render "api/projects/show", locals: {show_members: true}
    else
      @errors = @project.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def show
    @project = Project.find_by_id(params[:id])
    if (@project)
      render "api/projects/show", locals: {show_members: true}
    else
      @errors = ['Project not found']
      render "api/shared/error", status: 404
    end
  end

  def update
    @project = Project.find_by_id(params[:id])
    if (@project && @project.update(project_params))
      render "api/projects/show", locals: {show_members: true}
    elsif (@project)
      @errors = @project.errors.full_messages
      render "api/shared/error", status: 422
    else
      @errors = ['project not found']
      render "api/shared/error", status: 404
    end
  end

  def destroy
    @project = Project.find_by_id(params[:id])
    if (@project.destroy)
      render "api/projects/show", locals: {show_members: false}
    else
      @errors = @project.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def project_params
    params.require(:project).permit(:title, :description, :owner_id)
  end

end
