from django.db import models
from django.forms import ModelForm, Form, CharField, TextInput, EmailField, PasswordInput
from django.contrib.auth.models import User
from django import forms
from multimediaGallery import settings

# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.CharField(max_length=500, null=True)
    city = models.CharField(max_length=100, null=True)
    country = models.CharField(max_length=100, null=True)


class Category(models.Model):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.name


class CategoryForm(ModelForm):
    class Meta:
        model = Category
        fields = ['name']


class Type(models.Model):
    typeId = models.CharField(max_length=200)

    def __str__(self):
        return self.typeId


class TypeForm(ModelForm):
    class Meta:
        model = Type
        fields = ['typeId']


class Multimedia(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    creationDate = models.DateField(auto_now_add=True, blank=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    type = models.ForeignKey(Type, on_delete=models.CASCADE)
    city = models.CharField(max_length=100, null=True)
    country = models.CharField(max_length=100, null=True)
    url = models.CharField(max_length=1000)
    imageFile = models.ImageField(upload_to='static', null=True, blank=True)

    def __str__(self):
        return 'Multimedia: ' + self.title

    def get_photo(self):
        return settings.MEDIA_URL + self.imageFile.name


class MultimediaForm(ModelForm):
    title = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form-control'}
    ))
    author = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form-control'}
    ))
    city = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form-control'}
    ))
    country = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form-control'}
    ))
    url = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form-control'}
    ), required=False)
    imageFile = forms.ImageField(required=False)

    class Meta:
        model = Multimedia
        fields = ['id', 'title', 'author', 'city', 'category',
                  'user', 'type', 'country', 'url', 'imageFile']


class Image(models.Model):
    name = models.CharField(max_length=200)
    url = models.CharField(max_length=1000)
    description = models.CharField(max_length=1000, null=True)
    type = models.CharField(max_length=5, blank=True)

    def __str__(self):
        return 'Image: ' + self.name


class ImageForm(ModelForm):
    class Meta:
        model = Image
        fields = ['name', 'url', 'description', 'type']


# Tabla comments
class Comment(models.Model):
    comment = models.CharField(max_length=300, null=False)
    userId = models.CharField(max_length=100, null=False)


class CommentForm(ModelForm):
    class Meta:
        model = Comment
        fields = ['comment', 'userId']


# Clip model
class Clip(models.Model):
    name = models.CharField(max_length=200)
    initialSec = models.SmallIntegerField(default=0)
    finalSec = models.SmallIntegerField(default=0)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    idMultimedia = models.ForeignKey(Multimedia, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class SignInForm(Form):
    username = CharField(max_length=50, widget=TextInput(
        attrs={'class': 'form-control'}
    ), required=True)
    password = CharField(min_length=8, max_length=10, widget=PasswordInput(
        attrs={'class': 'form-control'}
    ), required=True)
