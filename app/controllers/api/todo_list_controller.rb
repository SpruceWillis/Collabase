class Api::TodoListController < ApplicationController
  def create
    @todo_list = TodoList.new(todo_params)
    if (@todo_list.save)
      render "api/todo_list/show"
    else
      @errors = @todo_list.errors.full_messages
      render "api/shared/errors", status: 422
    end
  end

  def show
    @todo_list = TodoList.find_by_id(params[:id])
    if (@todo_list)
      render "api/todo_list/show"
    else
      @errors = ['resource not found']
      render "api/shared/errors", status: 404
    end
  end

  def index
    @todo_lists = TodoList.all
    if (params[:project_id])
      @todo_lists = @todo_lists.where(project_id: params[:project_id])

    end
    if (params[:user_id])
      @todo_lists = @todo_lists.where(project_id: params[:user_id])
    end
    render "api/todo_list/index"
  end

  def update
    @todo_list = TodoList.find_by_id(params[:id])
    if (@todo_list && @todo_list.update(todo_params))
      render "api/todo_list/show"
    else
      @errors = ['resource not found']
      render "api/shared/errors", status: 404
    end
  end

  def destroy
    @todo_list = TodoList.find_by_id(params[:id])
    if (@todo_list && @todo_list.destroy)
      render "api/todo_list/show"
    else
      @errors = ['resource not found']
      render "api/shared/errors", status: 404
    end
  end

  def todo_params
    params.require(:todo_list).permit(:project_id, :user_id, :title,
    :description, :completed)
  end`
end
