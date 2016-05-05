class Api::TodoItemsController < ApplicationController
  def create
    @todo_item = TodoItem.new(todo_item_params)
    @todo_item.user_id = 1
    @todo_item.todo_list_id = params[:todo_list_id]
    if (@todo_item.save)
      @todo_list = TodoList.includes(:todo_items).find_by_id(params[:todo_list_id])
      render 'api/todo_lists/show'
    else
      @errors = @todo_item.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def show
    @todo_item = TodoItem.find_by_id(params[:id])
    if (@todo_item)
      render 'api/todo_items/show'
    else
      @errors = ['resource not found']
      render 'api/shared/error', status: 404
    end
  end

  def update
    @todo_item = TodoItem.find_by_id(params[:id])
    if (@todo_item && @todo_item.update(todo_item_params))
      @todo_list = TodoList.find_by_id(@todo_item.todo_list_id)
      render 'api/todo_items/show'
    else
      @errors = ['resource not found']
      render 'api/shared/error', status: 404
    end
  end

  def destroy
    @todo_item = TodoItem.find_by_id(params[:id])
    if (@todo_item && @todo_item.destroy)
      @todo_list = TodoList.includes(:todo_items).find_by_id(@todo_item.todo_list_id)
      render 'api/todo_lists/show'
    else
      @errors = ['resource not found']
      render 'api/shared/error', status: 404
    end
  end

  def todo_item_params
    params.require(:todo_item).permit([:title, :description, :due_date, :completed])
  end
end
