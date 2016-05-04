class Api::TodoListsController < ApplicationController
  #TODO: validate that the user is on a project before being allowed to perform these actions.
  def create
    @todo_list = TodoList.new(todo_list_params)
    @todo_list.project_id = params[:project_id]
    @todo_list.user_id = current_user.id
    if (@todo_list.save)
      render "api/todo_lists/show"
    else
      @errors = @todo_list.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def index
    @project = Project.find_by_id(params[:project_id])
    if (@project)
      @todo_lists = TodoList.where(project_id: params[:project_id])
      render "api/todo_lists/index"
    else
      @errors = ['resource not found']
      render "api/shared/error", status: 404
    end
  end

  def show
    @todo_list = TodoList.find_by_id(params[:id])
    if (@todo_list)
      render "api/todo_lists/show"
    else
      @errors = ['resource not found']
      render "api/shared/error", status: 404
    end
  end

  def update
    @todo_list = TodoList.find_by_id(params[:id])
    if (@todo_list.update(todo_list_params))
      render "api/todo_lists/show"
    else
      @errors = @todo_list.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def destroy
    @todo_list = TodoList.find_by_id(params[:id])
  if (@todo_list && @todo_list.destroy)
    render "api/todo_lists/show"
  else
    @errors = ['resource not found']
    render "api/shared/error", status: 404
  end
  end

  def todo_list_params
    params.require(:todo_list).permit( :title, :description, :completed)
  end
end
