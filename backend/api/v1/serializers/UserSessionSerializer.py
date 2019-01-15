from django.contrib.auth import get_user_model, logout
from django.db.models import Q
from rest_framework import serializers, status
from rest_framework_jwt.settings import api_settings

import jwt

jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
jwt_expiration_delta = api_settings.JWT_EXPIRATION_DELTA
User = get_user_model()


class UserSessionSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(
        style={'type': 'password'}, write_only=True)

    def _get_user(self, username):
        user = User.objects.filter(
            Q(username__iexact=username) |
            Q(email__iexact=username)
        ).distinct().first()
        if not user:
            raise serializers.ValidationError(
                dict(error='User credentials do not exist.'))
        if not user.is_active:
            raise serializers.ValidationError(
                dict(error='You are not authorized to perform this action.'))
        return user

    def _get_payload(self, token):
        payload = None
        try:
            payload = jwt_decode_handler(token)
        except jwt.ExpiredSignature:
            raise serializers.ValidationError(
                dict(error='You are not authorized to perform this action.'))
        except jwt.DecodeError:
            raise serializers.ValidationError(
                dict(error='You are not authorized to perform this action.'))
        return payload

    def validate_get(self, token):
        (user, payload) = (None, None)
        payload = self._get_payload(token)
        user = self._get_user(payload.get('username'))
        return (user, token, status.HTTP_200_OK)

    def validate_post(self, data):
        (user, token) = (None, None)
        username = data.get('username')
        password = data.get('password')
        if not username and not password:
            raise serializers.ValidationError(
                dict(username='This field is required.', password='This field is required'))
        if not username:
            raise serializers.ValidationError(
                dict(username='This field is required.'))
        if not password:
            raise serializers.ValidationError(
                dict(password='This field is required.'))
        user = self._get_user(username)
        if not user.check_password(password):
            raise serializers.ValidationError(
                dict(error='Invalid username or password.'))
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return (user, token, status.HTTP_200_OK)

    def validate_delete(self, req):
        (user, token) = (None, None)
        logout(req)
        return (user, token, status.HTTP_204_NO_CONTENT)
