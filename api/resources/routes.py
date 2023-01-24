from .auth import SignupApi, LoginApi, CurrentUserApi, LogoutApi
from .exam import ExamApi

def initialize_routes(api):
    api.add_resource(SignupApi, '/api/auth/signup', )
    api.add_resource(LoginApi, '/api/auth/login')
    api.add_resource(LogoutApi, '/api/auth/logout')
    

    api.add_resource(CurrentUserApi, '/api/profile/@me')

    api.add_resource(ExamApi, '/api/exms')
    