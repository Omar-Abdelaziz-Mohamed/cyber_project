# backend/api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("teams/", views.TeamListCreate.as_view(), name="team-list"),
    path("contacts/", views.ContactListCreate.as_view(), name="contact-list"),
    path("invoices/", views.InvoiceListCreate.as_view(), name="invoice-list"),
    
    path("calendar/", views.CalendarEventListCreate.as_view(), name="calendar-list"),
    path("faq/", views.FAQListCreate.as_view(), name="faq-list"),
    path("bar-chart/", views.BarChartDataListCreate.as_view(), name="bar-chart-list"),
    path("pie-chart/", views.PieChartDataListCreate.as_view(), name="pie-chart-list"),
    path("line-chart/", views.LineChartDataListCreate.as_view(), name="line-chart-list"),
    path("geography/", views.GeographyDataListCreate.as_view(), name="geography-list"),
]