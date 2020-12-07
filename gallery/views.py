from django.contrib.auth.forms import UserChangeForm, PasswordChangeForm
from django.urls import reverse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import Multimedia, MultimediaForm, User, SignInForm, UserProfile, Clip, Category, Type
from django.contrib import messages
from django.conf import settings
from django.core.mail import EmailMessage
from gallery.forms import RegistrationForm, EditProfileForm
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import MultimediaSerializer, UserSerializer, UserCreateSeralizer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
from .serializers import MultimediaSerializer, UserSerializer
import json
from django.core import serializers
from rest_framework.generics import CreateAPIView
# Create your views here.


def home(request):
    return render(request, 'index.html', context=None)


def index(request):
    multimedia_list = Multimedia.objects.all()
    error = ''
    if request.method == 'POST':
        form = SignInForm(request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                error = ''
                return HttpResponseRedirect('/')
            else:
                error = 'Username or password not correct'
        else:
            form = SignInForm()
    else:
        form = SignInForm()

    context = {'multimedia_list': multimedia_list,
               'form': form, 'error': error}
    return render(request, 'gallery/multimedia.html', context)


def add_multimedia(request):
    if request.method == 'POST':
        form = MultimediaForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/')
    else:
        form = MultimediaForm()

    return render(request, 'gallery/multimedia_form.html', {'form': form})


# Handles the sign in of an user
# If the user is already logged in, the user is redirected to the index page


def sign_in(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('multimedia:index'))
    else:
        error = ''
        if request.method == 'POST':
            form = SignInForm(request.POST)
            if form.is_valid():
                username = request.POST['username']
                password = request.POST['password']
                user = authenticate(
                    request, username=username, password=password)
                if user is not None:
                    login(request, user)
                    error = ''
                    return HttpResponseRedirect('/')
                else:
                    error = 'Username or password not correct'
        else:
            form = SignInForm()

    return render(request, 'gallery/sign_in_form.html', {'form': form, 'error': error})


def signUp(request):
    if request.method == 'GET':
        form = RegistrationForm()
        args = {'form': form}
        return render(request, 'gallery/signUp.html', args)
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            subject = 'Bienvenido a nuestra galería'
            message = 'Gracias por registrarte en nuestra plataforma, estamos felices que seas parte de Multimedia Gallery. No te pierdas del contenido multimedia de nuestro portal.'
            from_email = settings.EMAIL_HOST_USER
            to_email = form.cleaned_data.get('email')
            email = EmailMessage(subject, message,from_email, to = [to_email])
            email.send()
            return redirect('/')
        else:
            messages.error(request,
                           'Su contraseña: no puede ser similar a su información personal, debe contener al menos 8 caracteres, no puede ser una contraseña de uso común y no puede ser solo numérica.')
            return HttpResponseRedirect('/signUp')


def get_user(request):
    if request.user.is_authenticated:
        user = UserProfile.objects.get(user=request.user)
        args = {'currentUser': user}
        return render(request, 'gallery/userDetails.html', args)

    return HttpResponseRedirect('/')


def edit_profile(request):
    oldUser = UserProfile.objects.get(user=request.user)
    user = User.objects.get(id=request.user.id)

    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']

        user.first_name = first_name
        user.last_name = last_name
        user.email = email

        user.save()

        oldUser.photo = request.POST['photo']
        oldUser.city = request.POST['city']
        oldUser.country = request.POST['country']

        oldUser.save()

        return redirect(reverse('gallery:userDetails'))

    else:
        error = ''
        oldPhoto = oldUser.photo
        oldCity = oldUser.city
        oldCountry = oldUser.country
        args = {'oldPhoto': oldPhoto,
                'oldCity': oldCity, 'oldCountry': oldCountry, 'error': error}

        return render(request, 'gallery/editUser.html', args)


def change_password(request):
    print(request.method)

    if request.method == 'POST':
        form = PasswordChangeForm(data=request.POST, user=request.user)

        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
            return redirect(reverse('gallery:editUser'))
        else:
            print('error password')
            messages.error(
                request, 'Error al diligenciar el formulario. El password no cumple los requisitos')
            return HttpResponseRedirect('/change_password')
    else:
        print('get password')
        form = PasswordChangeForm(user=request.user)

        args = {'form': form}
        return render(request, 'gallery/change_password.html', args)

    return HttpResponseRedirect('/')


# ------------------- Api ------------------------

def getMulti(request):
    data = Multimedia.objects.all()
    if request.method == 'GET':
        serializer = MultimediaSerializer(data, many=True)
    return JsonResponse(serializer.data, safe=False)


def getUser(request):
    data = User.objects.all()
    if request.method == 'GET':
        serializer = UserSerializer(data, many=True)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_400_BAD_REQUEST)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'username': user.username},
                    status=HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def clip_create(request):

    if request.method == 'POST':
        json_data = json.loads(request.body)
        print(clip_create,)
        newClip = Clip(
            name=json_data['name'],
            initialSec=json_data['initialSec'],
            finalSec=json_data['finalSec'],
            userId=User.objects.get(username=json_data['username']),
            idMultimedia=Multimedia.objects.get(id=(json_data['idMultimedia'])))
        print("clip create", newClip.name)
        newClip.save()
        subject = '¡Felicidades! Creaste un nuevo clip'
        message = 'Queremos confirmarte que tu nuevo clip ha sido creado. No te pierdas de todo el contenido multimedia de nuestro portal.'
        from_email = settings.EMAIL_HOST_USER
        to_email = newClip.userId.email
        email = EmailMessage(subject, message, from_email, to=[to_email])
        email.send()
    return HttpResponse(serializers.serialize("json", [newClip]))


def get_clips(request):
    clip_list = Clip.objects.all()
    return HttpResponse(serializers.serialize("json", clip_list))


def get_id_clip(request, idMultimedia=None):
    clip_list = Clip.objects.filter(idMultimedia=idMultimedia)
    return HttpResponse(serializers.serialize("json", clip_list))


def get_category(request):
    category_list = Category.objects.all()
    return HttpResponse(serializers.serialize("json", category_list))


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def create_multimedia(request):

    if request.method == 'POST':
        json_data = json.loads(request.body)
        print(create_multimedia,)
        newMultimedia = Multimedia(
            title=json_data['title'],
            author=json_data['author'],
            user=User.objects.get(username=json_data['username']),
            creationDate=json_data['creationDate'],
            city=json_data['city'],
            country=json_data['country'],
            url=json_data['url'],
            category=Category.objects.get(id=json_data['category_id']),
            type=Type.objects.get(id=json_data['type_id']))
        print("multimedia create", newMultimedia.title)
        newMultimedia.save()
    return HttpResponse(serializers.serialize("json", [newMultimedia]))


class UserCreateAPIView(CreateAPIView):
    serializer_class = UserCreateSeralizer
    queryset = User.objects.all()



