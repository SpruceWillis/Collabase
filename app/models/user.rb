require 'bcrypt'

class User < ActiveRecord::Base
  validates :name, :email, :organization, :password_digest, presence: true
  validates :email, uniqueness: true
  validates :password, length: {minimum: 8}, allow_nil: true
  attr_reader :password

  after_initialize :ensure_session_token
  before_validation :ensure_session_token_uniqueness

  has_many :projects,
    dependent: :destroy,
    foreign_key: :owner_id,
    class_name: Project

  has_many :project_memberships,
    dependent: :destroy,
    foreign_key: :member_id

  has_many :member_projects,
    through: :project_memberships,
    source: :project

  has_many :todo_lists

  has_many :todo_items

  def password= (password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def self.find_by_params(params)
    project_memberships = ProjectMembership.where(project_id: params[:project_id]).pluck(:member_id)
    users = User.where.not(id: project_memberships)
    if (params[:name] && params[:name].length > 0)
      users = users.where("LOWER(name) LIKE :query", query: "%#{params[:name].downcase}%")
    end
    if (params[:organization])
      users = users.where("LOWER(organization) LIKE :query", query: "%#{params[:organization].downcase}")
    end
    users.limit(10)
  end

  def self.find_by_credentials (email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.password_is?(password) ? user : nil
  end

  def password_is? (password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = new_session_token
    ensure_session_token_uniqueness
    self.save
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= new_session_token
  end

  def new_session_token
    SecureRandom.base64
  end

  def ensure_session_token_uniqueness
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
  end

end
