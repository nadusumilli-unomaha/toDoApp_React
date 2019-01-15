from rest_framework import serializers
from django.contrib.auth import get_user_model

from django.utils import timezone
from django.utils.translation import gettext as _

from rest_framework_jwt.settings import api_settings
from rest_framework.validators import UniqueValidator

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_expiration_delta = api_settings.JWT_EXPIRATION_DELTA
User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    '''
        Register Serializer for the users to register to the app.
    '''
    confirm_password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)
    token = serializers.SerializerMethodField(read_only=True)
    token_expires = serializers.SerializerMethodField(read_only=True)
    is_authenticated = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'email',
                  'password', 'confirm_password', 'token', 'token_expires', 'is_authenticated', 'is_admin',)
        extra_kwargs = {'password': {'write_only': True}}

    def get_token(self, obj):
        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def get_token_expires(self, obj):
        token_expires = timezone.now() + jwt_expiration_delta
        return token_expires

    def get_is_authenticated(self, obj):
        return obj.is_authenticated

    def get_is_admin(self, obj):
        return obj.is_superuser

    def validate_username(self, value):
        if value in User.objects.values_list('username', flat=True):
            raise serializers.ValidationError(
                'A user with that username already exists')
        return value

    def validate_email(self, value):
        if value in User.objects.values_list('email', flat=True):
            raise serializers.ValidationError(
                'A user with that email already exists.')
        return value

    def validate(self, data):
        (password, confirm_password) = (
            data.get('password'), data.pop('confirm_password'))
        if password != confirm_password:
            raise serializers.ValidationError('Passwords do no match')
        return data

    def create(self, validated_data):
        user_obj = User(username=validated_data.get('username'), email=validated_data.get(
            'email'), first_name=validated_data.get('first_name'), last_name=validated_data.get('last_name'))
        user_obj.set_password(validated_data.get('password'))
        user_obj.save()
        return user_obj
