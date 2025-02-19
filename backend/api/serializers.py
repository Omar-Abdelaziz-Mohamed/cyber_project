# backend/api/serializers.py
import re
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import Note
# =========================================================================
from rest_framework import serializers
from .models import Note, Team, Contact, Invoice, CalendarEvent, FAQ, BarChartData, PieChartData, LineChartData, GeographyData
# ===========================================================================

# def validate_alpha_field(value, field_name):
#     if not re.match(r'^[\w\s-]+$', value, re.UNICODE):
#         raise serializers.ValidationError(f"{field_name} must contain only letters and spaces.")
#     return value



# ======================user=====================================
class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "confirm_password"]

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        return value

    def validate(self, data):
        self.validate_passwords_match(data["password"], data["confirm_password"])
        validate_password(data["password"])
        return data

    def validate_passwords_match(self, password, confirm_password):
        if password != confirm_password:
            raise ValidationError({"confirm_password": "Passwords do not match."})

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        return User.objects.create_user(**validated_data)
    
# ==============================end user===========================================





# ============================note===================================================
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}
# ============================end note=====================================================
        

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ["id", "name", "description", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}



class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ["id", "name", "email", "phone", "address", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}



class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = ["id", "invoice_number", "amount", "date", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}



class CalendarEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarEvent
        fields = ["id", "title", "description", "start_time", "end_time", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}




class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}




class BarChartDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = BarChartData
        fields = ["id", "label", "value", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}




class PieChartDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PieChartData
        fields = ["id", "label", "value", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}



class LineChartDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = LineChartData
        fields = ["id", "label", "value", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}



class GeographyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeographyData
        fields = ["id", "country", "value", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}