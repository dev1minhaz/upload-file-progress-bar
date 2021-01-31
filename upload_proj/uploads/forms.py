from django import forms
from django.forms import fields
from .models import Upload


class UploadForm(forms.ModelForm):
    class Meta:
        model = Upload
        fields = ['image', ]
