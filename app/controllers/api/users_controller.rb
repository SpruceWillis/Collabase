class Api::UsersController < ApplicationController

  def create
		@user = User.new(user_params)
		if @user.save
			login(@user)
      
			render "api/users/show", locals: {show_projects: true}
		else
			@errors = @user.errors.full_messages
			render "api/shared/error", status: 422
		end
	end

  def user_params
    params.require(:user).permit(:email, :password, :name, :organization)
  end

end
