from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User

from .models import Produit
from .serializers import ProduitSerializer, UserSerializer


# =========================
# PRODUITS
# =========================
class ProduitViewSet(viewsets.ModelViewSet):

    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer

    # Seuls les utilisateurs authentifiés peuvent voir les produits
    permission_classes = [permissions.IsAuthenticated]


# =========================
# USERS (Inscription seulement)
# =========================
class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    # Autoriser seulement création utilisateur
    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


# =========================
# CURRENT USER (Utilisateur connecté)
# =========================
class CurrentUserView(APIView):
    """
    Endpoint pour récupérer les informations de l'utilisateur actuellement connecté
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """
        Retourne les données de l'utilisateur connecté
        """
        serializer = UserSerializer(request.user)
        return Response(serializer.data)