from rest_framework import permissions

class IsUnauthenticated(permissions.BasePermission):
   message = "User is already logged in"

   def has_permission(self, request, view):
       return not request.user.is_authenticated
