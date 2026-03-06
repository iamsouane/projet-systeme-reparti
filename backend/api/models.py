from django.db import models


class Produit(models.Model):
    nom = models.CharField(max_length=100)
    prix = models.FloatField()


class Utilisateur(models.Model):
    nom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
