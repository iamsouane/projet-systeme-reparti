from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

from .models import Produit


# =========================
# PRODUIT SERIALIZER
# =========================
class ProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = "__all__"


# =========================
# USER SERIALIZER
# =========================
class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
        ]

    # Validation email unique
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise ValidationError("Cet email est déjà utilisé")
        return value

    # Création utilisateur avec password hashé
    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User.objects.create(**validated_data)
        user.set_password(password)  # Hash password (TRÈS IMPORTANT)
        user.save()

        return user
